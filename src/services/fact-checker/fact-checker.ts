import { z } from "zod";
import AiService from "../ai";
import { PROMPTS } from "./prompt";

const FormattedSubtitleSchema = z.object({ subtitle: z.array(z.string()) });
const DetectedClaimsSchema = z.object({
	claims: z.array(
		z.object({
			number: z.number(),
			reason: z.string(),
		}),
	),
});

type FormattedSubtiteResult = z.infer<typeof FormattedSubtitleSchema>;
type DetectedClaimsResult = z.infer<typeof DetectedClaimsSchema>;

export default class FactCheckerService {
	private ai = AiService.create();
	private _pipeline: {
		formattedSubtitle?: FormattedSubtiteResult["subtitle"];
		claims?: DetectedClaimsResult["claims"] | null;
	} = {};

	constructor() {}

	public async execute(input: { subtitle: string }) {
		const formattedSubtitleResult = await this.formatSubtitle(input.subtitle);
		const detectedClaimsResult = await this.detectClaims(
			formattedSubtitleResult.subtitle,
		);
		return detectedClaimsResult;
	}

	public get pipeline() {
		return this._pipeline;
	}

	private async formatSubtitle(
		subtitle: string,
	): Promise<FormattedSubtiteResult> {
		// const result = await this.ai.generateText({
		// 	prompt: `${PROMPTS.formatSubtitle}
		//   input: ${subtitle}
		//   `,
		// 	config: {
		// 		model: "gpt-4o-mini",
		// 		temperature: 0,
		// 	},
		// });

		const result = (await this.ai.generateObject({
			prompt: `input: ${subtitle}`,
			schema: FormattedSubtitleSchema,
			schemaName: "FormattedSubtitle",
			schemaDescription: "Split subtitle into sentences",
			config: {
				model: "gpt-4o-mini",
				system: PROMPTS.formatSubtitle,
				temperature: 0,
				mode: "json",
			},
		})) as FormattedSubtiteResult;

		this._pipeline.formattedSubtitle = result.subtitle;

		return result;
	}

	private async detectClaims(subtitle: string[]) {
		const result = (await this.ai.generateObject({
			prompt: this.convertSubtitleToPrompt(subtitle),
			schema: DetectedClaimsSchema,
			schemaName: "DetectedClaims",
			schemaDescription:
				"Detect factually-verifiable check-worthy claims from subtitle. Express the extracted claims as objects of the type { number: number, reason: string }. Here, number represents the index of the input statement (sentence), and reason provides an explanation for the inclusion of the claim.",
			config: {
				system: PROMPTS.detectClaims,
				temperature: 0,
				mode: "json",
			},
		})) as DetectedClaimsResult;

		this._pipeline.claims = result.claims;

		return result;
	}

	private convertSubtitleToPrompt(subtitle: string[]): string {
		const input = subtitle
			.map((sentence, index) => `${index + 1}.${sentence}`)
			.join("\n");
		return `input:${input}`;
	}
}
