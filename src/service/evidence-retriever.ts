import RETRIEVE_EVIDENCES_PROMPT from "@/constants/prompts/retrieve-evidences";
import Retriever, { RetrievedSource } from "./retriver";
import { TokenUsage } from "@/logger/llm-history.logger";

export interface RetrievedEvidenceResult {
	content: string[];
	sources: RetrievedSource[];
	metadata?: {
		tokenUsage: TokenUsage;
		model: string;
	};
}

export default class EvidenceRetriever {
	private retriever;

	constructor(signal: AbortSignal, private options?: { devMode?: boolean }) {
		this.retriever = new Retriever(signal);
	}

	public get isDevMode(): boolean {
		return this.options?.devMode ?? false;
	}

	public async retrieve(claim: string): Promise<RetrievedEvidenceResult> {
		if (this.isDevMode) return this.retrieveOnDevMode();

		const { metadata, ...evidence } = await this.retriever.retrieve(claim, {
			system: RETRIEVE_EVIDENCES_PROMPT,
			mode: "json",
		});

		const { candidatesTokenCount, promptTokenCount, totalTokenCount } =
			metadata.tokenUsage ?? {};

		return {
			...evidence,
			metadata: {
				tokenUsage: {
					promptTokens: promptTokenCount ?? 0,
					completionTokens: candidatesTokenCount ?? 0,
					totalTokens: totalTokenCount ?? 0,
				},
				model: metadata.model,
			},
		};
	}

	private async retrieveOnDevMode(): Promise<RetrievedEvidenceResult> {
		const { evidences } = await import("/mock/retrieved-evidence.json");
		const idx = Math.floor(Math.random() * evidences.length);

		return {
			...evidences[idx],
		};
	}
}
