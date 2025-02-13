import { z } from "zod";
import { Prompts } from "./prompt";
import EventEmitter from "events";
import LLMTokenUsageLogger from "@/logger/llm-token-usage";
import { formatDate } from "@/utils/date";
import LLMPromptLogger from "@/logger/llm-prompt";
import { RetrievedResult } from "../retriver";
import ClaimDetector, { DetectedClaim } from "../claim-detector";
import loadConfig from "@/config";
import EvidenceRetriever from "../evidence-retriever";
import ClaimVerifier from "../claim-verifier";
import LLMHistoryLogger from "@/logger/llm-history.logger";

// const SearchQuerySchema = z.string().describe("검색 쿼리 문자열");

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
	CLAIM_VERIFIED = "CLAIM_VERIFIED",
	VERIFICATION_FINISHED = "VERIFICATION_FINISHED",
}

const TOKEN_USAGE_LOG_PATH = "logs/token-usage";
const PROMPTY_LOG_PATH = "logs/prompt";

export default class FactCheckerService {
	private devMode = false;
	private events = new EventEmitter();
	private logger = new LLMHistoryLogger("fact-checker", {
		title: "Fact Checker",
	});
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

	public onClaimDetected(listener: (claim: DetectedClaim) => void): this {
		this.events.on(EventType.CLAIM_DETECTED, listener);
		return this;
	}

	public onClaimVerified(
		listener: (verifiedClaim: VerifiedClaim) => void,
	): this {
		this.events.on(EventType.CLAIM_VERIFIED, listener);
		return this;
	}

	public onVerificationFinished(listener: () => void): this {
		this.events.on(EventType.VERIFICATION_FINISHED, listener);
		return this;
	}

	public async start(subtitle: string) {
		this.events
			.on(EventType.CLAIMS_DETECTECTION_FINISHED, this.retrieveEvidences)
			.on(EventType.EVIDENCE_RETRIEVED, this.verifyClaim)
			.on(EventType.VERIFICATION_FINISHED, () => {});

		await this.detectClaims(subtitle);
	}

	private async detectClaims(subtitle: string): Promise<void> {
		const isMock = loadConfig().useMockClaimDetection;
		const claimDetector = new ClaimDetector({
			devMode: isMock ?? this.devMode,
		});

		this.logger.new__monitor((log, error, save) =>
			claimDetector
				.onClaimDetected(this.handleClaimDetected)
				.onFinished(({ output: claims, usage }) => {
					if (!claims) {
						error({
							code: "DetectClaimsError",
							error: new Error("Claims output is not generated"),
						});
						save();
						return;
					}

					this.handleClaimsDetectionFinished(claims);

					if (!claimDetector.isDevMode) {
						log({
							title: "Claims detection",
							model: "gpt-4o",
							prompt: subtitle,
							output: claims,
							tokenUsage: usage,
						});
						save();
					}
				})
				.onError(async (err) => {
					if (claimDetector.isDevMode) return;
					error({
						code: "DetectClaimsError",
						error: err,
					});
					save();
				})
				.start(subtitle),
		);
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
	}) {
		const isMock = loadConfig().useMockClaimVerification;
		const verifier = new ClaimVerifier({ devMode: isMock ?? this.devMode });

		try {
			const startedAt = new Date();

			const { metadata, ...verified } = await verifier.verify(
				claimContent,
				evidence.content,
			);

			this.events.emit(EventType.CLAIM_VERIFIED, verified);

			if (isLast) {
				this.events.emit(EventType.VERIFICATION_FINISHED);
				await Promise.all([
					this.promptyLogger.save(),
					this.tokenUsageLogger.save(),
				]);
			}

			if (!this.devMode && metadata) {
				const title = "Verify Claims";
				const description = "Verify claims with evidence";

				this.promptyLogger.log({
					title,
					description,
					model: "gpt-4o",
					system: Prompts.VERIFY_CLAIM,
					prompt: metadata.prompt,
					output: verified,
					generatationTime: new Date().getTime() - startedAt.getTime(),
				});

				this.tokenUsageLogger.log({
					title,
					description,
					...metadata.tokenUsage,
					model: "gpt-4o-mini",
					createdAt: formatDate(),
				});
			}
		} catch (error) {
			const code = "VerifyClaimError";
			await Promise.all([
				this.promptyLogger.error(code, error as Error).save(),
				this.tokenUsageLogger.error(code, error as Error).save(),
			]);
		}
	}

	// Deprecated
	// private async generateSearchQueries(claims: string[]): Promise<string[]> {
	// 	const log = {
	// 		title: "Generate Search Queries",
	// 		description: "Generate search queries from claims",
	// 	};
	// 	const prompt = claims.map((claim, i) => `${i}.${claim}`).join("\n");

	// 	const startedAt = new Date();

	// 	const result = await generateObject({
	// 		model: openai(AIModel.GPT_4O),
	// 		prompt,
	// 		output: "array",
	// 		mode: "json",
	// 		schema: SearchQuerySchema,
	// 		schemaName: "SearchQueries",
	// 		schemaDescription:
	// 			"각 주장에 대한 구글 검색 쿼리를 생성하세요. 검색 쿼리는 주장에 대한 핵심 내용을 잘 표현해야 합니다.",
	// 		temperature: 0,
	// 	});

	// 	const endedAt = new Date();

	// 	this.promptyLogger.log({
	// 		...log,
	// 		model: "gpt-4o-mini",
	// 		system: Prompts.GENERATE_SEARCH_QUERIES,
	// 		prompt,
	// 		output: result.object,
	// 		generatationTime: endedAt.getTime() - startedAt.getTime(),
	// 	});

	// 	this.tokenUsageLogger.log({
	// 		...log,
	// 		...result.usage,
	// 		model: "gpt-4o-mini",
	// 		description: "Generate search queries from claims",
	// 		createdAt: formatDate(),
	// 	});

	// 	return result.object;
	// }
}
