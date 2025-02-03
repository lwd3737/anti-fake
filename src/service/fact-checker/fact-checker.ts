import { z } from "zod";
import { Prompts } from "./prompt";
import GoogleSearchService from "../google-search";
import EventEmitter from "events";
import { generateObject, streamObject } from "ai";
import { createAIModel } from "@/helpers/ai";
import LLMTokenUsageLogger from "@/infra/logger/llm-token-usage";
import { formatDate } from "@/utils/date";
import LLMPromptLogger from "@/infra/logger/llm-prompt";
import Retriever, { RetrievedResult } from "../retriver";
import ClaimDetector, { DetectedClaim } from "../claim-detector";
import loadConfig from "@/config";

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

// type DetectedClaim = z.infer<typeof DetectedClaimSchema>;

type RetrievedEvidence = Omit<RetrievedResult<string[]>, "tokenUsage">;

type VerifiedClaim = z.infer<typeof VerifiedClaimSchema>;

enum EventType {
	CLAIM_DETECTED = "CALIMES_DETECTED",
	CLAIMS_DETECTECTION_FINISHED = "CALIMS_DETECTECTION_FINISHED",
	EVIDENCES_RETRIEVED_PER_CLAIM = "EVIDENCES_RETRIEVED_PER_CLAIM",
	CLAIM_VERIFIED = "CLAIM_VERIFIED",
	ALL_CLAIMS_VERIFIED = "ALL_CLAIMS_VERIFIED",
}

const TOKEN_USAGE_LOG_PATH = "logs/token-usage";
const PROMPTY_LOG_PATH = "logs/prompt";
const RETRIEVE_LOG_PATH = "logs/retrieve";

const SEARCH_RESULT_COUNT = 3;

export default class FactCheckerService {
	private devMode = false;
	private events = new EventEmitter();
	private promptyLogger = new LLMPromptLogger(
		`${PROMPTY_LOG_PATH}/${formatDate()}.json`,
		{
			title: "Fact Check",
			description: "Fact Check process",
		},
	);
	private tokenUsageLogger = new LLMTokenUsageLogger(
		`${TOKEN_USAGE_LOG_PATH}/${formatDate()}.json`,
		{
			title: "Fact Check",
			description: "Fact Check process",
		},
	);

	constructor(options: { devMode?: boolean } = {}) {
		if (options?.devMode) {
			this.devMode = options.devMode;
		}

		this.handleClaimDetected = this.handleClaimDetected.bind(this);
		this.retrieveEvidences = this.retrieveEvidences.bind(this);
		// this.retrieveEvidence = this.retrieveEvidence.bind(this);
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

	public onAllClaimsVerified(listener: () => void): this {
		this.events.on(EventType.ALL_CLAIMS_VERIFIED, listener);
		return this;
	}

	public async start(subtitle: string) {
		// await this.correctSubtitle(input.subtitle);

		// this.events.on(
		// 	EventType.CLAIMS_DETECTECTION_FINISHED,
		// 	this.retrieveEvidences,
		// );
		// .on(EventType.EVIDENCES_RETRIEVED_PER_CLAIM, this.verifyClaim)
		// .on(EventType.ALL_CLAIMS_VERIFIED, () => {});

		await this.new__detectClaims(subtitle);
		// await this.detectClaims(subtitle);
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

	private async new__detectClaims(subtitle: string): Promise<void> {
		const isMock = loadConfig().useMockClaimDetection;
		const claimDetector = new ClaimDetector({
			devMode: isMock ?? this.devMode,
		});

		const startedAt = new Date();

		claimDetector
			.onClaimDetected(this.handleClaimDetected)
			.onFinished(({ output: claims, usage }) => {
				if (!claims) {
					this.promptyLogger.error(
						"DetectClaimsError",
						new Error("Claims output is not generated"),
					);
					return;
				}

				this.handleClaimsDetectionFinished(claims);

				if (!claimDetector.isDevMode) {
					const endedAt = new Date();

					this.promptyLogger.log({
						title: "Detect Claims",
						description: "Detect claims from subtitle",
						model: "gpt-4o",
						system: Prompts.DETECT_CLAIMS,
						prompt: subtitle,
						output: claims,
						generatationTime: endedAt.getTime() - startedAt.getTime(),
					});
					this.tokenUsageLogger.log({
						...usage,
						model: "gpt-4o-mini",
						title: "Detect Claims",
						description: "Detect claims from subtitle",
						createdAt: formatDate(),
					});
				}
			})
			.onError(async (error) => {
				if (claimDetector.isDevMode) return;

				const code = "DetectClaimsError";
				await Promise.all([
					this.promptyLogger.error(code, error as Error).save(),
					this.tokenUsageLogger.error(code, error as Error).save(),
				]);
			})
			.start(subtitle);
	}

	private handleClaimDetected(claim: DetectedClaim): void {
		this.events.emit(EventType.CLAIM_DETECTED, claim);
	}

	private handleClaimsDetectionFinished(claims: DetectedClaim[]): void {
		this.events.emit(EventType.CLAIMS_DETECTECTION_FINISHED, claims);
	}

	private async retrieveEvidences(claims: DetectedClaim[]): Promise<void> {
		const search = GoogleSearchService.create();
		const claimContents = claims.map((claim) => claim.content);

		const retriever = new Retriever();

		try {
			let idx = 0;

			for (const claimContent of claimContents) {
				const startedAt = new Date();

				const { tokenUsage, ...evidence } = await retriever.retrieve(
					claimContent,
					{
						system: Prompts.RETRIVE_EVIDENCES,
						mode: "json",
						onCompleted: (result) => {
							// logJsonFile(`${RETRIEVE_LOG_PATH}/${formatDate()}.json`, {
							// 	text: result.response.text(),
							// 	...result,
							// });
						},
					},
				);

				console.log("evidence", evidence);

				this.events.emit(EventType.EVIDENCES_RETRIEVED_PER_CLAIM, {
					claimContent,
					evidence,
					isLast: idx === claimContents.length - 1,
				});

				idx++;

				this.promptyLogger.log({
					model: "gemini-1.5-flash",
					title: "Retrieve Evidences",
					description: "Retrieve evidence from claims",
					system: Prompts.RETRIVE_EVIDENCES,
					prompt: claimContent,
					output: evidence,
					generatationTime: new Date().getTime() - startedAt.getTime(),
				});

				if (tokenUsage) {
					this.tokenUsageLogger.log({
						model: "gemini-1.5-flash",
						title: "Retrieve Evidences",
						description: "Retrieve evidence from claims",
						createdAt: formatDate(),
						promptTokens: tokenUsage.promptTokenCount,
						completionTokens: tokenUsage.candidatesTokenCount,
						totalTokens: tokenUsage.totalTokenCount,
					});
				}
			}
		} catch (error) {
			const code = "RetrieveEvidencesError";
			await Promise.all([
				this.promptyLogger.error(code, error as Error).save(),
				this.tokenUsageLogger.error(code, error as Error).save(),
			]);
		}
	}

	private async verifyClaim({
		claimContent,
		evidence,
		isLast,
	}: {
		claimContent: string;
		evidence: RetrievedEvidence;
		isLast?: boolean;
	}): Promise<void> {
		const prompt = `${claimContent}\n${evidence.content
			.map((item, idx) => `${idx}.${item}`)
			.join("\n")}`;

		try {
			const startedAt = new Date();

			const log = {
				title: "Verify Claims",
				description: "Verify claims with evidence",
			};

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

			const endedAt = new Date();

			this.events.emit(EventType.CLAIM_VERIFIED, result.object);

			if (isLast) {
				this.events.emit(EventType.ALL_CLAIMS_VERIFIED);
				await Promise.all([
					this.promptyLogger.save(),
					this.tokenUsageLogger.save(),
				]);
			}

			this.promptyLogger.log({
				...log,
				model: "gpt-4o",
				system: Prompts.VERIFY_CLAIM,
				prompt,
				output: result.object,
				generatationTime: endedAt.getTime() - startedAt.getTime(),
			});

			this.tokenUsageLogger.log({
				...log,
				...result.usage,
				model: "gpt-4o-mini",
				createdAt: formatDate(),
			});
		} catch (error) {
			const code = "VerifyClaimError";
			await Promise.all([
				this.promptyLogger.error(code, error as Error).save(),
				this.tokenUsageLogger.error(code, error as Error).save(),
			]);
		}
	}

	private async generateSearchQueries(claims: string[]): Promise<string[]> {
		const log = {
			title: "Generate Search Queries",
			description: "Generate search queries from claims",
		};
		const prompt = claims.map((claim, i) => `${i}.${claim}`).join("\n");

		const startedAt = new Date();

		const result = await generateObject({
			model: createAIModel("gpt-4o-mini"),
			prompt,
			output: "array",
			mode: "json",
			schema: SearchQuerySchema,
			schemaName: "SearchQueries",
			schemaDescription:
				"각 주장에 대한 구글 검색 쿼리를 생성하세요. 검색 쿼리는 주장에 대한 핵심 내용을 잘 표현해야 합니다.",
			temperature: 0,
		});

		const endedAt = new Date();

		this.promptyLogger.log({
			...log,
			model: "gpt-4o-mini",
			system: Prompts.GENERATE_SEARCH_QUERIES,
			prompt,
			output: result.object,
			generatationTime: endedAt.getTime() - startedAt.getTime(),
		});

		this.tokenUsageLogger.log({
			...log,
			...result.usage,
			model: "gpt-4o-mini",
			description: "Generate search queries from claims",
			createdAt: formatDate(),
		});

		return result.object;
	}
}
