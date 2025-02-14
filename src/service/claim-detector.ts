import { AIModel, openai } from "@/helpers/ai";
import { LanguageModelUsage, streamObject } from "ai";
import DETECT_CLAIM_PROMPT from "@/constants/prompts/detect-claim";
import { z } from "zod";
import EventEmitter from "events";

enum EventType {
	CLAIM_DETECTED = "CLAIM_DETECTED",
	FINISHED = "FINISHED",
	ERROR = "ERROR",
}

const DetectedClaimSchema = z.object({
	content: z
		.string()
		.describe(
			"탐지된 검증 가능한 주장 및 관련된 문장. 주장에 해당하는 문장뿐만 아니라 관련된 문장들도 함께 content에 포함시킬 수 있습니다",
		),
	reason: z.string().describe("해당 주장이 검증 가능한 주장으로 탐지된 이유"),
});

export type DetectedClaim = z.infer<typeof DetectedClaimSchema>;

const STREAM_INTERVAL = 100;

export default class ClaimDetector {
	private events = new EventEmitter();

	constructor(
		private options?: { devMode?: boolean; mockDataCount?: number },
	) {}

	public get isDevMode(): boolean {
		return this.options?.devMode ?? false;
	}

	public async start(text: string): Promise<void> {
		if (this.options?.devMode) {
			return this.detectOnDevMode();
		}

		try {
			const result = await streamObject({
				model: openai(AIModel.GPT_4O),
				system: DETECT_CLAIM_PROMPT,
				prompt: text,
				mode: "json",
				output: "array",
				schema: DetectedClaimSchema,
				schemaName: "DetectedClaims",
				schemaDescription:
					"자막에서 사실적으로 검증 가능하고 검증할 가치가 있는 주장과 이유를 나타냅니다.",
				temperature: 0,
				onFinish: (event) => {
					this.events.emit(EventType.FINISHED, {
						output: event.object,
						usage: event.usage,
					});
				},
			});

			for await (const claim of result.elementStream) {
				this.events.emit(EventType.CLAIM_DETECTED, claim);
			}
		} catch (error) {
			this.events.emit(EventType.ERROR, error as Error);
		}
	}

	private async detectOnDevMode(): Promise<void> {
		const mockData = await import("/mock/detected-claims.json");
		const { mockDataCount } = this.options ?? {};
		const claims = mockData.claims.slice(
			0,
			mockDataCount ?? mockData.claims.length,
		);

		for (const claim of claims) {
			this.events.emit(EventType.CLAIM_DETECTED, claim);

			await new Promise((resolve) => setTimeout(resolve, STREAM_INTERVAL));
		}

		this.events.emit(EventType.FINISHED, {
			output: claims,
			usage: {
				promptTokens: 0,
				completionTokens: 0,
				totalTokens: 0,
			},
		});
	}

	public onClaimDetected(listener: (claim: DetectedClaim) => void): this {
		this.events.on(EventType.CLAIM_DETECTED, listener);
		return this;
	}

	public onFinished(
		listener: (result: {
			output: DetectedClaim[] | undefined;
			usage: LanguageModelUsage;
		}) => void,
	): this {
		this.events.on(EventType.FINISHED, listener);
		return this;
	}

	public onError(listener: (error: Error) => void): this {
		this.events.on(EventType.ERROR, listener);
		return this;
	}
}
