import { openai } from "@/helpers/ai";
import { generateObject } from "ai";
import { z } from "zod";
import LLMHistoryLogger from "@/logger/llm-history.logger";
import loadConfig from "@/config";
import VERIFY_CLAIM_PROMPT from "@/constants/prompts/verify-claim";

const ClaimVerificationResultSchema = z.object({
	verdict: z
		.union([
			z.literal("TRUE"),
			z.literal("MOSTLY_TRUE"),
			z.literal("MIXED"),
			z.literal("MOSTLY_FALSE"),
			z.literal("FALSE"),
		])
		.describe("주장의 진실 여부 라벨"),
	reason: z.string().describe("주장에 대한 판결에 대한 이유"),
});

export type ClaimVerificationResult = z.infer<
	typeof ClaimVerificationResultSchema
>;

export default class ClaimVerifier {
	private logger = new LLMHistoryLogger("claim-verifier", {
		title: "Claim verifier",
	});

	constructor(private signal: AbortSignal) {}

	private get isDevMode(): boolean {
		const { devMode } = loadConfig();
		return devMode.claimVerification ?? devMode.default;
	}

	public async verify(
		{
			claim,
			evidence,
		}: {
			claim: string;
			evidence: string[];
		},
		isCompleted?: boolean,
	): Promise<ClaimVerificationResult> {
		if (this.isDevMode) return this.verifyOnDevMode();

		const result = this.logger.monitor<ClaimVerificationResult>(async () => {
			const prompt = `${claim}\n${evidence
				.map((item, idx) => `${idx}.${item}`)
				.join("\n")}`;

			const result = await generateObject({
				model: openai("gpt-4o"),
				system: VERIFY_CLAIM_PROMPT,
				prompt,
				mode: "json",
				schema: ClaimVerificationResultSchema,
				schemaName: "ClaimVerificationResult",
				schemaDescription: "주장에 대한 검증 결과를 판단하세요.",
				temperature: 0,
				abortSignal: this.signal,
			});

			return result.object;
		});

		if (isCompleted) this.logger.save();

		return result;
	}

	private async verifyOnDevMode(): Promise<ClaimVerificationResult> {
		const { claimVerificationResults } = await import(
			"/mock/claim-verification-results.json"
		);
		const idx = Math.floor(Math.random() * claimVerificationResults.length);
		return claimVerificationResults[idx] as ClaimVerificationResult;
	}
}
