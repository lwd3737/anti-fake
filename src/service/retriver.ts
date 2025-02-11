import loadConfig from "@/config";
import {
	DynamicRetrievalMode,
	GenerateContentResponse,
	GenerateContentResult,
	GenerativeModel,
	GoogleGenerativeAI,
	GroundingChunk,
	GroundingChunkWeb,
	GroundingMetadata,
} from "@google/generative-ai";

export interface RetrievedResult<Content = any> {
	content: Content;
	sources: RetrievedSource[];
	metadata: {
		tokenUsage: GenerateContentResponse["usageMetadata"];
		model: string;
	};
}

export type RetrievedSource = GroundingChunkWeb;

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

	public async retrieve<OutputContent = any>(
		query: string,
		{
			system,
			temperature = 0,
			mode = "text",
			onCompleted,
		}: {
			system?: string;
			temperature?: number;
			mode?: "json" | "text";
			onCompleted?: (result: GenerateContentResult) => void;
		},
	): Promise<RetrievedResult<OutputContent>> {
		const result = await this.model.generateContent({
			contents: [
				{
					role: "user",
					parts: [{ text: query }],
				},
			],
			systemInstruction: system,
			generationConfig: {
				temperature,
			},
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
		});

		onCompleted?.(result);

		const sources =
			result.response.candidates?.reduce((sources, candidate) => {
				const groundingMetadata = candidate.groundingMetadata as Omit<
					GroundingMetadata,
					"groundingChuncks"
				> & {
					groundingChunks: GroundingChunk[];
				};
				groundingMetadata.groundingChunks?.forEach((chunk) => {
					if (chunk.web) sources.push(chunk.web);
				});

				return sources;
			}, [] as GroundingChunkWeb[]) ?? [];

		const output = result.response.text();
		const content =
			mode === "json"
				? JSON.parse(output.replace(/```json|```/g, "").trim())
				: output;

		return {
			content,
			sources,
			metadata: {
				tokenUsage: result.response.usageMetadata,
				model: this.model.model,
			},
		};
	}
}
