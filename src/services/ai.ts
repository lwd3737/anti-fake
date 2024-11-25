import loadConfig, { Config } from "@/config";
import { openai } from "@ai-sdk/openai";
import { generateObject, generateText, LanguageModelV1, streamText } from "ai";
import { z, ZodSchema } from "zod";

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

	public async generateText(input: {
		prompt: string;
		config?: { model?: string; temperature?: number; system?: string };
	}): Promise<string> {
		const { prompt, config } = input;

		const result = await generateText({
			model: config?.model ? openai(config?.model) : this.model,
			system: config?.system,
			prompt,
			temperature: config?.temperature,
		});
		return result.text;
	}

	public async generateObject(input: {
		schema: ZodSchema;
		schemaName?: string;
		schemaDescription?: string;
		prompt: string;
		config?: {
			mode?: "auto" | "json" | "tool";
			system?: string;
			model?: string;
			temperature?: number;
		};
	}): Promise<any> {
		const { schema, schemaName, schemaDescription, prompt, config } = input;

		const result = await generateObject({
			model: config?.model ? openai(config?.model) : this.model,
			schema,
			schemaName,
			schemaDescription,
			prompt,
			mode: config?.mode ?? "json",
			system: config?.system,
			temperature: config?.temperature,
		});

		return result.object;
	}
}
