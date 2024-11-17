import { z } from "zod";
import AiService from "../ai";
import { PROMPTS } from "./prompt";

const FormattedSubtitleSchema = z.object({ subtitle: z.array(z.string()) });
const ClaimsSchema = z.object({ claims: z.array(z.string()) });

type FormattedSubtiteResult = z.infer<typeof FormattedSubtitleSchema>;
type DetectedClaimsResult = z.infer<typeof ClaimsSchema>;

export default class FactCheckerService {
	private ai = AiService.create();
	private _pipeline: {
		formattedSubtitle?: FormattedSubtiteResult["subtitle"];
		claims?: DetectedClaimsResult["claims"] | null;
	} = {};

	constructor() {}

	public async execute(input: { subtitle: string }) {
		const formattedSubtitle = await this.formatSubtitle(input.subtitle);
		return formattedSubtitle;
		// const claims = await this.new__detectClaims(formattedSubtitle);
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
			schemaName: "formattedSubtitle",
			schemaDescription: "split subtitle into sentences",
			config: {
				model: "gpt-4o-mini",
				system: PROMPTS.formatSubtitle,
				temperature: 0,
				mode: "json",
			},
		})) as FormattedSubtiteResult;

		return result;
	}

	private async detectClaims(subtitle: string[]) {
		const prompt = this.formatSentences(subtitle);

		const result = (await this.ai.generateObject({
			prompt,
			schema: ClaimsSchema,
			config: {
				system: PROMPTS.detectClaim,
				temperature: 0,
			},
		})) as DetectedClaimsResult;

		return result;
	}

	private formatSentences(sentences: string[]): string {
		return sentences.map((sentence) => `1.${sentence}`).join("\n");
	}
}
