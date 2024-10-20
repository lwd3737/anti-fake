import loadConfig, { Config } from "@/config";
import { openai } from "@ai-sdk/openai";
import { LanguageModelV1, streamObject, streamText } from "ai";

export default class AiService {
	private model: LanguageModelV1;

	public static create() {
		const config = loadConfig();
		return new AiService({ openai: config.openai });
	}

	constructor(config: Pick<Config, "openai">) {
		this.model = openai(config.openai.gptModel);
	}

	public async streamText(
		prompt: string,
		options?: { system?: string },
	): Promise<Response> {
		const res = await streamText({
			model: this.model,
			system: options?.system,
			prompt,
		});

		return res.toTextStreamResponse();
	}
}
