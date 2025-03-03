import { openai } from "@/helpers/ai";
import { generateObject } from "ai";
import { Prompts } from "./fact-checker/prompt";
import { z } from "zod";
import LLMHistoryLogger, { TokenUsage } from "@/logger/llm-history.logger";
import loadConfig from "@/config";

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

export type VerifiedClaim = z.infer<typeof VerifiedClaimSchema>;

export default class ClaimVerifier {
	private logger = new LLMHistoryLogger("claim-verifier", {
		title: "Claim verifier",
	});

	constructor(private signal: AbortSignal) {}

	private get isDevMode(): boolean {
		const { new__devMode } = loadConfig();
		return new__devMode.claimVerification ?? new__devMode.default;
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
	): Promise<VerifiedClaim> {
		if (this.isDevMode) return this.verifyOnDevMode();

		const result = this.logger.monitor<VerifiedClaim>(async () => {
			const prompt = `${claim}\n${evidence
				.map((item, idx) => `${idx}.${item}`)
				.join("\n")}`;

			const result = await generateObject({
				model: openai("gpt-4o"),
				system: Prompts.VERIFY_CLAIM,
				prompt,
				mode: "json",
				schema: VerifiedClaimSchema,
				schemaName: "VerifiedClaims",
				schemaDescription: "주장에 대한 검증 결과를 판단하세요.",
				temperature: 0,
				abortSignal: this.signal,
			});

			return result.object;
		});

		if (isCompleted) this.logger.save();

		return result;
	}

	private async verifyOnDevMode(): Promise<VerifiedClaim> {
		const { verifiedClaims } = await import("/mock/verified-claim.json");
		const idx = Math.floor(Math.random() * verifiedClaims.length);
		return verifiedClaims[idx] as VerifiedClaim;
	}
}
