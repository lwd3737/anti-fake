import { z } from "zod";
import { Prompts } from "./prompt";
import EventEmitter from "events";
import { formatDate } from "@/utils/date";
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

export default class FactCheckerService {
	private devMode = false;
	private events = new EventEmitter();
	private logger = new LLMHistoryLogger("fact-checker", {
		title: "Fact Checker",
	});

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
			mockDataCount: 1,
		});

		this.logger.monitor((log, error, save) =>
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

		this.logger.monitor(async (log, error, save) => {
			for (let idx = 0; idx < claimContents.length; idx++) {
				const claimContent = claimContents[idx];

				try {
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

						log({
							title: "Retrieve Evidences",
							model,
							prompt: claimContent,
							output: evidence,
							tokenUsage,
						});
					}
				} catch (err) {
					if (retriever.isDevMode) return;

					error({
						code: "RetrieveEvidencesError",
						error: err as Error,
					});
				}
			}
		});
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

		this.logger.monitor(async (log, error, save) => {
			try {
				const { metadata, ...verified } = await verifier.verify(
					claimContent,
					evidence.content,
				);

				this.events.emit(EventType.CLAIM_VERIFIED, verified);

				if (isLast) {
					this.events.emit(EventType.VERIFICATION_FINISHED);
				}

				if (!this.devMode && metadata) {
					log({
						title: "Claim Verification",
						model: "gpt-4o",
						prompt: metadata.prompt,
						output: verified,
						tokenUsage: metadata.tokenUsage,
					});
				}
			} catch (err) {
				const code = "VerifyClaimError";

				error({
					code,
					error: err as Error,
				});
			} finally {
				if (isLast) {
					await save();
				}
			}
		});
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
