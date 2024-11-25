import { z } from "zod";
import AiService from "../ai";
import { PROMPTS } from "./prompt";
import GoogleSearchService from "../google-search";

const FormattedSubtitleSchema = z.object({ subtitle: z.array(z.string()) });
const DetectedClaimsSchema = z.object({
	items: z.array(
		z.object({
			claim: z.string(),
			reason: z.string(),
		}),
	),
});

type StageResults = {
	correctedSubtitle?: string;
	detectedClaims?: DetectedClaimsResult;
};
type DetectedClaimsResult = z.infer<typeof DetectedClaimsSchema>;

export default class FactCheckerService {
	private ai = AiService.create();
	private stageResults: StageResults = {};

	constructor() {}

	public getStageResult(stage: keyof StageResults) {
		const stageResult = this.stageResults[stage];
		if (!stageResult)
			throw new Error(`Stage result for ${stage} is not available`);
		return stageResult;
	}

	public async execute(subtitle: string) {
		// await this.correctSubtitle(input.subtitle);
		await this.new__detectClaims(subtitle);
	}

	private async correctSubtitle(subtitle: string): Promise<string> {
		const result = await this.ai.generateText({
			prompt: `subtitle: ${subtitle}`,
			config: {
				model: "gpt-4o-mini",
				system: PROMPTS.correctSubtitle,
				temperature: 0,
			},
		});

		this.stageResults.correctedSubtitle = result;

		return result;
	}

	private async new__detectClaims(
		subtitle: string,
	): Promise<DetectedClaimsResult> {
		// const subtitle = this.getStageResult("correctedSubtitle");

		const result = (await this.ai.generateObject({
			prompt: `subtitle: ${subtitle}`,
			schema: DetectedClaimsSchema,
			schemaName: "DetectedClaims",
			schemaDescription:
				"자막에서 사실적으로 검증 가능하고 검증 가치가 있는 주장들을 탐지하세요. 추출된 주장들은 '{ items: { claim: string, reason: string }[] }' 형식으로 표현하세요. 여기서 claim은 추출된 주장을 나타내고, reason은 해당 주장을 포함한 이유를 설명합니다.",
			config: {
				model: "gpt-4o-mini",
				system: PROMPTS.detectClaims,
				temperature: 0,
				mode: "json",
			},
		})) as DetectedClaimsResult;

		this.stageResults.detectedClaims = result;

		return result;
	}

	// private async retrieveEvidence() {
	// 	const search = GoogleSearchService.create();

	// 	this.claims.map(async (info) => {
	// 		const index = info.number - 1;
	// 		const claim = this.formattedSubtitle[index];
	// 		const query = await this.generateSearchQuery(claim);

	// 		const evidencesInfo = await search.list(query);
	// 	});
	// }

	// private async generateSearchQuery(claim: string): Promise<string> {
	// 	return await this.ai.generateText({
	// 		prompt: `claim: ${claim}`,
	// 		config: {
	// 			model: "gpt-4o-mini",
	// 			system: PROMPTS.generateSearchQuery,
	// 			temperature: 0,
	// 		},
	// 	});
	// }

	public logStageResults() {
		console.debug("correctec subtitle:", this.stageResults.correctedSubtitle);
		console.debug("detected claims:", this.stageResults.detectedClaims);
	}
}
