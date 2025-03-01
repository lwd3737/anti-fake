import loadConfig from "@/config";
import { TokenUsage } from "@/logger/llm-history.logger";
import {
	DynamicRetrievalMode,
	GenerateContentResult,
	GenerativeModel,
	GoogleGenerativeAI,
	GroundingChunk,
	GroundingChunkWeb,
	GroundingMetadata,
} from "@google/generative-ai";

export interface RetrievedResult<Content = unknown> {
	content: Content;
	sources: RetrievedSource[];
	metadata: {
		tokenUsage: TokenUsage;
		model: string;
	};
}

export type RetrievedSource = GroundingChunkWeb;

export default class Retriever {
	private model: GenerativeModel;

	constructor(private signal: AbortSignal) {
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
		const result = await this.model.generateContent(
			{
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
			},
			{
				signal: this.signal,
			},
		);

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
		const { promptTokenCount, candidatesTokenCount, totalTokenCount } =
			result.response.usageMetadata ?? {};

		return {
			content,
			sources,
			metadata: {
				tokenUsage: {
					promptTokens: promptTokenCount ?? 0,
					completionTokens: candidatesTokenCount ?? 0,
					totalTokens: totalTokenCount ?? 0,
				},
				model: this.model.model,
			},
		};
	}
}
