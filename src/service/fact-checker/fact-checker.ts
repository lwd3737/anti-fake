import { z } from "zod";
import { Prompts } from "./prompt";
import GoogleSearchService from "../google-search";
import parse, { HTMLElement } from "node-html-parser";
import { GoogleSearchItemDto } from "@/dto/google-search";
import EventEmitter from "events";
import { generateObject, generateText, streamObject } from "ai";
import { createAIModel } from "@/helpers/ai";
import LLMTokenUsageLogger, {
	TokenUsageError,
} from "@/infra/logger/llm-token-usage";
import { formatDate } from "@/util/date";

const DetectedClaimSchema = z.object({
	content: z
		.string()
		.describe(
			"탐지된 검증 가능한 주장 및 관련된 문장. 주장에 해당하는 문장뿐만 아니라 관련된 문장들도 함께 content에 포함시킬 수 있습니다",
		),
	reason: z.string().describe("해당 주장이 검증 가능한 주장으로 탐지된 이유"),
});

const SearchQuerySchema = z.string().describe("검색 쿼리 문자열");

const VerifiedClaimSchema = z.object({
	verdictPrediction: z
		.union([
			z.literal("TRUE"),
			z.literal("MOSTLY_TRUE"),
			z.literal("MIXED"),
			z.literal("MOSTLY_FALSE"),
			z.literal("FALSE"),
		])
		.describe("주장의 진실 여부 라벨"),
	justificationProduction: z.string().describe("주장에 대한 판결에 대한 이유"),
});

type DetectedClaim = z.infer<typeof DetectedClaimSchema>;

type VerifiedClaim = z.infer<typeof VerifiedClaimSchema>;

interface RetrievedEvidence {
	title: string;
	content: string;
	link: string;
}

enum EventType {
	CLAIM_DETECTED = "CALIMES_DETECTED",
	ALL_CALIMS_DETECTED = "ALL_CALIMS_DETECTED",
	EVIDENCES_RETRIEVED_BY_CLAIM = "EVIDENCES_RETRIEVED_BY_CLAIM",
	CLAIM_VERIFIED = "CLAIM_VERIFIED",
}

const TOKEN_USAGE_LOG_PATH = "logs/";
const SEARCH_RESULT_COUNT = 3;

export default class FactCheckerService {
	private events = new EventEmitter();
	private tokenUsageLogger = new LLMTokenUsageLogger(
		`${TOKEN_USAGE_LOG_PATH}/${formatDate()}`,
		{
			title: "Fact Check",
			description: "Fact Check process",
		},
	);

	constructor() {
		this.retrieveEvidences = this.retrieveEvidences.bind(this);
		this.verifyClaim = this.verifyClaim.bind(this);
	}

	public onClaimsDetected(listener: (claim: DetectedClaim) => void): this {
		this.events.on(EventType.CLAIM_DETECTED, listener);
		return this;
	}

	public onClaimVerified(
		listener: (verifiedClaim: VerifiedClaim) => void,
	): this {
		this.events.on(EventType.CLAIM_VERIFIED, listener);
		return this;
	}

	public async execute(subtitle: string) {
		// await this.correctSubtitle(input.subtitle);

		this.events.on(EventType.ALL_CALIMS_DETECTED, this.retrieveEvidences);
		this.events.on(EventType.EVIDENCES_RETRIEVED_BY_CLAIM, this.verifyClaim);

		await this.detectClaims(subtitle);
	}

	// private async correctSubtitle(subtitle: string): Promise<string> {
	// 	const result = await this.ai.generateText({
	// 		prompt: `subtitle: ${subtitle}`,
	// 		config: {
	// 			model: "gpt-4o-mini",
	// 			system: PROMPTS.correctSubtitle,
	// 			temperature: 0,
	// 		},
	// 	});

	// 	this.stageResults.correctedSubtitle = result;

	// 	return result;
	// }

	private async detectClaims(subtitle: string): Promise<void> {
		// const subtitle = this.getStageResult("correctedSubtitle");
		try {
			const result = await streamObject({
				model: createAIModel("gpt-4o"),
				system: Prompts.DETECT_CLAIMS,
				prompt: `${subtitle}`,
				mode: "json",
				output: "array",
				schema: DetectedClaimSchema,
				schemaName: "DetectedClaims",
				schemaDescription:
					"자막에서 사실적으로 검증 가능하고 검증할 가치가 있는 주장과 이유를 나타냅니다.",
				temperature: 0,
				onFinish: (event) => {
					this.tokenUsageLogger.log({
						...event.usage,
						model: "gpt-4o-mini",
						title: "Detect Claims",
						description: "Detect claims from subtitle",
						createdAt: formatDate(),
					});
				},
			});

			for await (const claim of result.elementStream) {
				this.events.emit(EventType.CLAIM_DETECTED, claim);
			}

			this.events.emit(EventType.ALL_CALIMS_DETECTED);
		} catch (error) {
			this.tokenUsageLogger
				.log({
					name: "Detect Claims Error",
					message: (error as Error).message,
				})
				.save();
		}
	}

	private async retrieveEvidences(claims: DetectedClaim[]): Promise<void> {
		try {
			const search = GoogleSearchService.create();
			const claimContents = claims.map((claim) => claim.content);
			const searchQueries = await this.generateSearchQueries(claimContents);

			for (let idx = 0; idx < searchQueries.length; idx++) {
				const query = searchQueries[idx];
				const searchResult = await search.list(query, {
					count: SEARCH_RESULT_COUNT,
				});

				const evidences = await Promise.all(
					searchResult.items.map(this.retrieveEvidence),
				);

				this.events.emit(EventType.EVIDENCES_RETRIEVED_BY_CLAIM, {
					claim: claims[idx],
					evidences,
				});
			}
		} catch (error) {
			this.tokenUsageLogger
				.log({
					name: "Retrieve Evidences Error",
					message: (error as Error).message,
				})
				.save();
		}
	}

	private async retrieveEvidence(
		searchItem: GoogleSearchItemDto,
	): Promise<RetrievedEvidence> {
		const { title, link } = searchItem;

		const res = await fetch(link);
		const html = await res.text();
		const parsed = this.parseHtml(html);

		const content = await generateText({
			model: createAIModel("gpt-4o-mini"),
			system: Prompts.PARSE_HTML,
			prompt: parsed,
		});

		this.tokenUsageLogger.log({
			...content.usage,
			model: "gpt-4o-mini",
			title: `Parse HTML - ${title}`,
			description: "Parse HTML content",
			createdAt: formatDate(),
		});

		return {
			title,
			content: content.text,
			link,
		};
	}

	private async verifyClaim({
		claim,
		evidences,
	}: {
		claim: DetectedClaim;
		evidences: RetrievedEvidence[];
	}): Promise<void> {
		try {
			const prompt = `${claim.content}\n${evidences
				.map((evidence, idx) => `${idx}.${evidence.content}`)
				.join("\n")}`;

			const result = await generateObject({
				model: createAIModel("gpt-4o"),
				system: Prompts.VERIFY_CLAIM,
				prompt,
				mode: "json",
				schema: VerifiedClaimSchema,
				schemaName: "VerifiedClaims",
				schemaDescription: "주장에 대한 검증 결과를 판단하세요.",
				temperature: 0,
			});

			this.events.emit(EventType.CLAIM_VERIFIED, result.object);

			this.tokenUsageLogger.log({
				...result.usage,
				model: "gpt-4o-mini",
				title: "Verify Claims",
				description: "Verify claims with evidence",
				createdAt: formatDate(),
			});
		} catch (error) {
			this.tokenUsageLogger
				.log({
					name: "Verify Claim Error",
					message: (error as Error).message,
				})
				.save();
		}
	}

	private parseHtml(html: string): string {
		const [ELEMENT_NODE, TEXT_NODE] = [1, 3];

		const body = parse(html, {
			blockTextElements: {
				script: false,
				noscript: false,
				style: false,
				pre: false,
			},
		}).getElementsByTagName("body")[0];

		const elements: HTMLElement[] = [body];

		let text = "";

		while (elements.length > 0) {
			const curElement = elements.pop();
			if (!curElement) continue;

			for (const node of curElement.childNodes) {
				if (node.nodeType === TEXT_NODE) {
					text += node.textContent;
				} else if (node.nodeType === ELEMENT_NODE) {
					const el = node as unknown as HTMLElement;

					switch (el.tagName) {
						case "HEADER":
						case "FOOTER":
						case "NAV":
						case "ASIDE":
						case "SCRIPT":
						case "NOSCRIPT":
						case "STYLE":
							break;
						default:
							elements.push(el);
					}
				}
			}
		}

		return text;
	}

	private async generateSearchQueries(claims: string[]): Promise<string[]> {
		const result = await generateObject({
			model: createAIModel("gpt-4o-mini"),
			prompt: claims.map((claim, i) => `${i}.${claim}`).join("\n"),
			output: "array",
			mode: "json",
			schema: SearchQuerySchema,
			schemaName: "SearchQueries",
			schemaDescription:
				"각 주장에 대한 구글 검색 쿼리를 생성하세요. 검색 쿼리는 주장에 대한 핵심 내용을 잘 표현해야 합니다.",
			temperature: 0,
		});

		this.tokenUsageLogger.log({
			...result.usage,
			model: "gpt-4o-mini",
			title: "Generate Search Queries",
			description: "Generate search queries from claims",
			createdAt: formatDate(),
		});

		return result.object;
	}
}
