import loadConfig from "@/config";
import {
	DynamicRetrievalMode,
	GenerativeModel,
	GoogleGenerativeAI,
	GroundingChunkWeb,
} from "@google/generative-ai";

export interface RetrievedResult {
	content: string;
	sources: GroundingChunkWeb[];
}

export default class Retriever {
	private model: GenerativeModel;

	constructor() {
		const { google } = loadConfig();
		const ai = new GoogleGenerativeAI(google.gemini.apiKey);
		this.model = ai.getGenerativeModel(
			{
				model: "gemini-1.5-flash",
				tools: [
					{
						googleSearchRetrieval: {
							dynamicRetrievalConfig: {
								mode: DynamicRetrievalMode.MODE_DYNAMIC,
								dynamicThreshold: 0,
							},
						},
					},
				],
			},
			{ apiVersion: "v1beta" },
		);
	}

	public async retrieve(
		query: string,
		systemInstruction?: string,
	): Promise<RetrievedResult> {
		const result = await this.model.generateContent({
			contents: [
				{
					role: "user",
					parts: [{ text: query }],
				},
			],
			systemInstruction,
			generationConfig: {
				temperature: 0,
			},
		});

		const sources =
			result.response.candidates?.reduce((sources, candidate) => {
				candidate.groundingMetadata?.groundingChuncks?.forEach(
					(chunk) => chunk.web && sources.push(chunk.web),
				);
				return sources;
			}, [] as GroundingChunkWeb[]) ?? [];

		return {
			content: result.response.text(),
			sources,
		};
	}
}
