import { z } from "zod";
import AiService from "../ai";
import { PROMPTS } from "./prompt";
import GoogleSearchService from "../google-search";
import { json } from "@/utils/pretty";

const DetectedClaimsSchema = z.object({
	items: z.array(
		z.object({
			content: z.string(),
			reason: z.string(),
		}),
	),
});

type StageResults = {
	correctedSubtitle?: string;
	detectedClaims?: DetectedClaimsResult["items"];
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
		await this.detectClaims(subtitle);
		await this.retrieveEvidence();
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

	private async detectClaims(subtitle: string): Promise<DetectedClaimsResult> {
		// const subtitle = this.getStageResult("correctedSubtitle");

		const result = (await this.ai.generateObject({
			prompt: `subtitle: ${subtitle}`,
			schema: DetectedClaimsSchema,
			schemaName: "DetectedClaims",
			schemaDescription:
				"자막에서 사실적으로 검증 가능하고 검증 가치가 있는 주장들을 탐지하세요. 추출된 주장들은 '{ items: { content: string, reason: string }[] }' 형식으로 표현하세요. 여기서 content는 추출된 주장의 내용을 나타내고, reason은 해당 주장을 포함한 이유를 설명합니다.",
			config: {
				model: "gpt-4o-mini",
				system: PROMPTS.detectClaims,
				temperature: 0,
				mode: "json",
			},
		})) as DetectedClaimsResult;

		this.stageResults.detectedClaims = result.items;

		return result;
	}

	private async retrieveEvidence() {
		const claims = this.stageResults.detectedClaims;
		if (!claims) throw new Error("Claims are not found");

		const search = GoogleSearchService.create();

		const evidences = Promise.all(
			claims?.map(async (claim, i) => {
				const query = await this.generateSearchQuery(claim.content);
				const sanitizedQuery = this.sanitizeQuery(query);
				const evidencesInfo = await search.list(sanitizedQuery, { count: 5 });
				console.debug(
					"evidences:",
					evidencesInfo.items.forEach((item) =>
						console.log("snippet", item.snippet),
					),
				);
			}),
		);
	}

	private async generateSearchQuery(claim: string): Promise<string> {
		return await this.ai.generateText({
			prompt: `claim: ${claim}`,
			config: {
				model: "gpt-4o-mini",
				system: PROMPTS.generateSearchQuery,
				temperature: 0,
			},
		});
	}

	private sanitizeQuery(query: string): string {
		let sanitized = query;
		if (query.startsWith('"')) sanitized = sanitized.slice(1);
		if (query.endsWith('"')) sanitized = sanitized.slice(0, -1);
		return sanitized;
	}

	public logStageResults() {
		console.debug("correctec subtitle:", this.stageResults.correctedSubtitle);
		console.debug("detected claims:", this.stageResults.detectedClaims);
	}
}
