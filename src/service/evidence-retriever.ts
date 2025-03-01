import RETRIEVE_EVIDENCES_PROMPT from "@/constants/prompts/retrieve-evidences";
import Retriever, { RetrievedSource } from "./retriver";
import LLMHistoryLogger, { TokenUsage } from "@/logger/llm-history.logger";
import loadConfig from "@/config";
import EventEmitter from "events";

export type RetrievedEvidence =
	| { claimIndex: number } & (
			| {
					content: string[];
					sources: RetrievedSource[];
			  }
			| {
					error: string;
			  }
	  );

interface Claim {
	index: number;
	content: string;
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
		const { new__devMode } = loadConfig();
		return new__devMode.claimVerification ?? new__devMode.default;
	}

	public async start(claims: Claim[]): Promise<void> {
		// INFO: 현재는 rate limit 때문에 동기적으로 실행
		// TODO: rate limit을 고려하여 요청 여러개를 하나의 단위로 묶어서 비동기로 실행하도록 수정
		// 그룹으로 묶인 요청 사이에는 delay를 주어 rate limit을 준수하도록 함
		for (const claim of claims) {
			const result = await this.retrieve(claim);
			this.events.emit(EventType.RETRIEVED, result);
		}

		this.logger.save();
	}

	public onRetrieved(listener: (evidence: RetrievedEvidence) => void): this {
		this.events.on(EventType.RETRIEVED, listener);
		return this;
	}

	private async retrieve(claim: Claim): Promise<RetrievedEvidence> {
		if (this.isDevMode) return this.retrieveOnDevMode(claim);

		return this.logger.monitor<RetrievedEvidence>(async (log, error, save) => {
			try {
				const { metadata, ...evidence } = await this.retriever.retrieve(
					claim.content,
					{
						system: RETRIEVE_EVIDENCES_PROMPT,
						mode: "json",
					},
				);

				log({
					...metadata,
					title: "Retrieve Evidences",
					prompt: claim.content,
					output: evidence,
				});

				return { ...evidence, claimIndex: claim.index };
			} catch (e) {
				return {
					claimIndex: claim.index,
					error: "증거 조회 중에 에러가 발생했습니다.",
				};
			}
		});
	}

	private async retrieveOnDevMode(claim: Claim): Promise<RetrievedEvidence> {
		const { evidences } = await import("/mock/retrieved-evidence.json");
		const idx = Math.floor(Math.random() * evidences.length);

		return {
			...evidences[idx],
			claimIndex: claim.index,
		};
	}
}
