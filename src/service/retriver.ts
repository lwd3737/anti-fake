import loadConfig from "@/config";
import { TokenUsage } from "@/logger/llm-history.logger";
import {
	DynamicRetrievalMode,
	GenerativeModel,
	GoogleGenerativeAI,
	GroundingChunk,
	GroundingMetadata,
} from "@google/generative-ai";

export interface RetrievedResult<Content = unknown> {
	contents: Content;
	sources: RetrievalCitation[];
	metadata: {
		tokenUsage: TokenUsage;
		model: string;
	};
}

export interface RetrievalResult {
	summaries: RetrievalSummary[];
	citations: RetrievalCitation[];
	metadata: {
		tokenUsage: TokenUsage;
		model: string;
	};
}

export interface RetrievalSummary {
	content: string;
	citationIndices: number[];
}

export interface RetrievalCitation {
	title: string;
	uri: string;
}

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

	public async new__retrieve(
		query: string,
		{
			system,
			temperature = 0,
			mode = "text",
		}: {
			system?: string;
			temperature?: number;
			mode?: "json" | "text";
		},
	): Promise<RetrievalResult> {
		const generatedContent = await this.model.generateContent(
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

		const initialResult = {
			summaries: [] as RetrievalSummary[],
			citations: [] as RetrievalCitation[],
		} as RetrievalResult;

		const result =
			generatedContent.response.candidates?.reduce((result, candidate) => {
				// INFO: SDK 오타로 인해 타입 단언으로 해결
				const { groundingChunks, groundingSupports } =
					candidate.groundingMetadata as Omit<
						GroundingMetadata,
						"groundingChuncks" | "groundingSupports"
					> & {
						groundingChunks?: GroundingChunk[];
						groundingSupports?: {
							confidenceScores: number[];
							groundingChunkIndices: number[];
							segment: {
								text?: string;
								startIndex?: number;
								endIndex?: number;
								partIndex?: number;
							};
						}[];
					};

				const newSummaries =
					groundingSupports
						?.map((support) => {
							const { segment, groundingChunkIndices } = support;
							const { text } = segment as unknown as { text?: string };

							return {
								content: text,
								citationIndices: groundingChunkIndices,
							};
						})
						.filter(
							(summary): summary is RetrievalSummary =>
								!!summary.content && !!summary.citationIndices,
						) ?? [];
				result.summaries = [...result.summaries, ...newSummaries];

				const citiations =
					groundingChunks
						?.map((groundingChunk) => groundingChunk.web)
						.filter<RetrievalCitation>(
							(citiation): citiation is RetrievalCitation =>
								!!citiation?.title && !!citiation.uri,
						) ?? [];
				result.citations = Array.from(
					new Set([...result.citations, ...citiations]),
				);

				return result;
			}, initialResult as RetrievalResult) ?? initialResult;

		const { promptTokenCount, candidatesTokenCount, totalTokenCount } =
			generatedContent.response.usageMetadata ?? {};

		return {
			...result,
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

	private parseJsonContent(content: string) {
		return JSON.parse(content.replace(/```json|```/g, "").trim());
	}
}
