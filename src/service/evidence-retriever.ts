import RETRIEVE_EVIDENCES_PROMPT from "@/constants/prompts/retrieve-evidences";
import Retriever, { RetrievedSource } from "./retriver";
import LLMHistoryLogger from "@/logger/llm-history.logger";
import loadConfig from "@/config";
import EventEmitter from "events";

export type EvidenceRetrievalResult = RetrivedEvidence | EvidenceRetrievalError;

export interface RetrivedEvidence {
	contents: string[];
	sources: RetrievedSource[];
}

interface EvidenceRetrievalError {
	error: string;
}

enum EventType {
	RETRIEVED = "RETRIEVED",
}

export default class EvidenceRetriever {
	private events = new EventEmitter();
	private logger = new LLMHistoryLogger("retrieve-evidence", {
		title: "Retrieve evidence",
	});
	private retriever;

	constructor(signal: AbortSignal) {
		this.retriever = new Retriever(signal);
	}

	private get isDevMode(): boolean {
		const { devMode: new__devMode } = loadConfig();
		return new__devMode.claimVerification ?? new__devMode.default;
	}

	public async start(claims: string[]): Promise<void> {
		// INFO: 현재는 rate limit 때문에 동기적으로 실행
		// TODO: rate limit을 고려하여 요청 여러개를 하나의 단위로 묶어서 비동기로 실행하도록 수정
		// 그룹으로 묶인 요청 사이에는 delay를 주어 rate limit을 준수하도록 함
		for (const claim of claims) {
			const result = await this.retrieve(claim);
			this.events.emit(EventType.RETRIEVED, result);
		}

		this.logger.save();
	}

	public onRetrieved(
		listener: (evidence: EvidenceRetrievalResult) => void,
	): this {
		this.events.on(EventType.RETRIEVED, listener);
		return this;
	}

	public static isError(
		result: EvidenceRetrievalResult,
	): result is EvidenceRetrievalError {
		return "error" in result;
	}

	public async retrieve(
		claim: string,
		isCompleted?: boolean,
	): Promise<EvidenceRetrievalResult> {
		if (this.isDevMode) return this.retrieveOnDevMode(claim);

		const result = this.logger.monitor<EvidenceRetrievalResult>(
			async (log, error) => {
				try {
					const { metadata, ...evidence } = await this.retriever.retrieve(
						claim,
						{
							system: RETRIEVE_EVIDENCES_PROMPT,
							mode: "json",
						},
					);

					await log({
						...metadata,
						title: "Retrieve Evidences",
						prompt: claim,
						output: evidence,
					});

					return evidence;
				} catch (e) {
					await error({
						code: "RetrieveEvidencesError",
						error: e as Error,
					});

					return {
						error: "증거 조회 중에 에러가 발생했습니다.",
					};
				}
			},
		);

		if (isCompleted) await this.logger.save();

		return result;
	}

	private async retrieveOnDevMode(
		claim: string,
	): Promise<EvidenceRetrievalResult> {
		const { evidences } = await import("/mock/retrieved-evidence.json");
		const idx = Math.floor(Math.random() * evidences.length);

		return {
			...evidences[idx],
		};
	}
}
