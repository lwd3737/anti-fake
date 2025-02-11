import { z } from "zod";
import { Prompts } from "./prompt";
import EventEmitter from "events";
import { generateObject, streamObject } from "ai";
import { AIModel, openai } from "@/helpers/ai";
import LLMTokenUsageLogger from "@/infra/logger/llm-token-usage";
import { formatDate } from "@/utils/date";
import LLMPromptLogger from "@/infra/logger/llm-prompt";
import { RetrievedResult } from "../retriver";
import ClaimDetector, { DetectedClaim } from "../claim-detector";
import loadConfig from "@/config";
import EvidenceRetriever from "../evidence-retriever";

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

type RetrievedEvidence = Omit<RetrievedResult<string[]>, "tokenUsage">;

type VerifiedClaim = z.infer<typeof VerifiedClaimSchema>;

enum EventType {
	CLAIM_DETECTED = "CALIMES_DETECTED",
	CLAIMS_DETECTECTION_FINISHED = "CALIMS_DETECTECTION_FINISHED",
	EVIDENCE_RETRIEVED = "EVIDENCE_RETRIEVED",
	EVIDENCES_RETRIEVED_PER_CLAIM = "EVIDENCES_RETRIEVED_PER_CLAIM",
	CLAIM_VERIFIED = "CLAIM_VERIFIED",
	ALL_CLAIMS_VERIFIED = "ALL_CLAIMS_VERIFIED",
}

const TOKEN_USAGE_LOG_PATH = "logs/token-usage";
const PROMPTY_LOG_PATH = "logs/prompt";
const RETRIEVE_LOG_PATH = "logs/retrieve";

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
		// this.events.on(
		// 	EventType.CLAIMS_DETECTECTION_FINISHED,
		// 	this.retrieveEvidences,
		// );
		// .on(EventType.EVIDENCES_RETRIEVED_PER_CLAIM, this.verifyClaim)
		// .on(EventType.ALL_CLAIMS_VERIFIED, () => {});

		this.events.on(
			EventType.CLAIMS_DETECTECTION_FINISHED,
			this.retrieveEvidences,
		);

		this.events.on(EventType.EVIDENCE_RETRIEVED, this.verifyClaim);

		await this.detectClaims(subtitle);
	}

	private async detectClaims(subtitle: string): Promise<void> {
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

					const title = "Detect Claims";
					const description = "Detect claims from subtitle";

					this.promptyLogger.log({
						title,
						description,
						model: "gpt-4o",
						system: Prompts.DETECT_CLAIMS,
						prompt: subtitle,
						output: claims,
						generatationTime: endedAt.getTime() - startedAt.getTime(),
					});
					this.tokenUsageLogger.log({
						...usage,
						model: "gpt-4o-mini",
						title,
						description,
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
		const isMock = loadConfig().useMockEvidenceRetrieval;
		const retriever = new EvidenceRetriever({
			devMode: isMock ?? this.devMode,
		});

		const claimContents = claims.map((claim) => claim.content);

		try {
			for (let idx = 0; idx < claimContents.length; idx++) {
				const claimContent = claimContents[idx];

				const startedAt = new Date();

				const { metadata, ...evidence } = await retriever.retrieve(
					claimContent,
				);

				this.events.emit(EventType.EVIDENCE_RETRIEVED, {
					claimContent,
					evidence,
					isLast: idx === claimContents.length - 1,
				});

				if (!retriever.isDevMode && metadata) {
					const { model, tokenUsage } = metadata;

					const title = "Retrieve Evidences";
					const description = "Retrieve evidence from claims";

					this.promptyLogger.log({
						model,
						title,
						description,
						system: Prompts.RETRIVE_EVIDENCES,
						prompt: claimContent,
						output: evidence,
						generatationTime: new Date().getTime() - startedAt.getTime(),
					});

					this.tokenUsageLogger.log({
						model,
						title,
						description,
						createdAt: formatDate(),
						...tokenUsage,
					});
				}
			}
		} catch (error) {
			if (retriever.isDevMode) return;

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
				model: openai("gpt-4o"),
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

			console.log("result", isLast, result);
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
			model: openai(AIModel.GPT_4O),
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
