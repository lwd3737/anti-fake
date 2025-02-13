import { openai } from "@/helpers/ai";
import { generateObject } from "ai";
import { Prompts } from "./fact-checker/prompt";
import { z } from "zod";
import { TokenUsage } from "@/logger/llm-token-usage";

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

type VerifiedClaimResult = VerifiedClaim & {
	metadata?: {
		tokenUsage: TokenUsage;
		model: string;
		prompt: string;
	};
};

type VerifiedClaim = z.infer<typeof VerifiedClaimSchema>;

export default class ClaimVerifier {
	constructor(private options?: { devMode?: boolean }) {}

	public get isDevMode(): boolean {
		return this.options?.devMode ?? false;
	}

	public async verify(
		claim: string,
		evidence: string[],
	): Promise<VerifiedClaimResult> {
		if (this.isDevMode) return this.verifyOnDevMode();

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
		});

		return {
			...result.object,
			metadata: {
				tokenUsage: result.usage,
				model: "gpt-4o",
				prompt,
			},
		};
	}

	private async verifyOnDevMode(): Promise<VerifiedClaimResult> {
		const { verifiedClaims } = await import("/mock/verified-claim.json");
		const idx = Math.floor(Math.random() * verifiedClaims.length);
		return verifiedClaims[idx] as VerifiedClaimResult;
	}
}
