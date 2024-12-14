import { z } from "zod";
import AiService from "../ai";
import { PROMPTS } from "./prompt";
import GoogleSearchService from "../google-search";
import parse, { HTMLElement } from "node-html-parser";

const DetectedClaimsSchema = z.object({
	items: z.array(
		z.object({
			content: z.string(),
			reason: z.string(),
		}),
	),
});

const SearchKeywordsSchema = z.object({
	items: z.array(z.string()),
});

type StageResults = {
	correctedSubtitle?: string;
	detectedClaims?: DetectedClaimsResult["items"];
};
type DetectedClaimsResult = z.infer<typeof DetectedClaimsSchema>;
type SearchKeywordsResult = z.infer<typeof SearchKeywordsSchema>;
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
				"자막에서 사실적으로 검증 가능하고 검증할 가치가 있는 주장들을 탐지하세요. 추출된 주장들은 '{ items: { content: string, reason: string }[] }' 형식으로 표현하세요. 여기서 content는 추출된 주장의 내용을 나타내고, reason은 해당 주장을 포함한 이유를 설명합니다.",
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

		// TODO: claim을 묶어서 검색 쿼리 생성
		const claimContents = claims.map((claim) => claim.content);
		const searchQueries = await this.generateSearchKeywords(claimContents);

		// console.log("saerched count", searchKeyords.length * 3);

		searchQueries.map(async (query, i) => {
			const searchResult = await search.list(query, { count: 3 });

			const evidences = searchResult.items.map(async (item, i) => {
				const { title, link } = item;

				console.log(title, link);

				const res = await fetch(link);
				const html = await res.text();
				const parsed = this.parseHtml(html);

				// const parsed = await this.ai.generateText({
				// 	prompt: html,
				// 	config: {
				// 		model: "gpt-4o-mini",
				// 		system: PROMPTS.htmlParser,
				// 		temperature: 0,
				// 	},
				// });

				// return parsed;
			});
		});

		// const evidences = Promise.all(
		// 	claims?.map(async (claim, i) => {
		// 		const query = await this.generateSearchQuery(claim.content);
		// 		const sanitizedQuery = this.sanitizeQuery(query);
		// 		const searchResult = await search.list(sanitizedQuery, { count: 5 });

		// 		searchResult.items.map(async (item, i) => {
		// 			const { title, link } = item;

		// 			const res = await fetch(link);
		// 			const html = await res.text();

		// 			const content = await this.ai.generateText({
		// 				prompt: html,
		// 				config: {
		// 					model: "gpt-4o-mini",
		// 					system: PROMPTS.htmlParser,
		// 					temperature: 0,
		// 				},
		// 			});

		// 			if (i === 0) console.log(content);
		// 		});
		// 	}),
		// );
	}

	private parseHtml(html: string): string {
		const [ELEMENT_NODE, TEXT_NODE] = [1, 3];

		const body = parse(html, {
			blockTextElements: {
				script: false,
				noscript: false,
				style: false,
				pre: false,
			},
		}).getElementsByTagName("body")[0];

		const elements: HTMLElement[] = [body];

		let text = "";

		while (elements.length > 0) {
			const curElement = elements.pop();
			if (!curElement) continue;

			for (const node of curElement.childNodes) {
				if (node.nodeType === TEXT_NODE) {
					text += node.textContent;
				} else if (node.nodeType === ELEMENT_NODE) {
					const el = node as unknown as HTMLElement;

					switch (el.tagName) {
						case "HEADER":
						case "FOOTER":
						case "NAV":
						case "ASIDE":
						case "SCRIPT":
						case "NOSCRIPT":
						case "STYLE":
							break;
						default:
							elements.push(el);
					}
				}
			}
		}

		return text;
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

	private async generateSearchKeywords(claims: string[]): Promise<string[]> {
		const result = await this.ai.generateObject({
			prompt: claims.map((claim, i) => `${i}.${claim}`).join("\n"),
			schema: SearchKeywordsSchema,
			schemaName: "SearchQuery",
			schemaDescription:
				"각 주장에 대한 구글 검색 쿼리를 생성하세요. 검색 쿼리는 주장에 대한 핵심 내용을 잘 표현해야 합니다. 생성된 검색 쿼리는 '{ items: string[] }' 형식으로 표현하세요.",
			config: {
				model: "gpt-4o-mini",
				system: PROMPTS.generateSearchQuery,
				temperature: 0,
				mode: "json",
			},
		});

		return result.items;
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
