import { createAIModel } from "@/helpers/ai";
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

type DetectedClaim = z.infer<typeof DetectedClaimSchema>;

export default class ClaimDetector {
	private events = new EventEmitter();

	public async detect(text: string) {
		try {
			const result = await streamObject({
				model: createAIModel("gpt-4o"),
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

	public onClaimDetected(listener: (claim: DetectedClaim) => void): this {
		this.events.on(EventType.CLAIM_DETECTED, listener);
		return this;
	}

	public onFinished(
		listener: (result: {
			output?: DetectedClaim[];
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
