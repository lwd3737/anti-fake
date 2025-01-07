// Deprecated
import loadConfig, { Config } from "@/config";
import { openai } from "@ai-sdk/openai";
import {
	generateObject,
	generateText,
	LanguageModel,
	LanguageModelUsage,
	streamObject,
	streamText,
} from "ai";
import fs from "fs";
import path from "path";
import { ZodSchema } from "zod";

type TokenUsageRecord = LanguageModelUsage & {
	title: string;
	description?: string;
	createdAt: Date;
};

type StreamTextArgs = Omit<Parameters<typeof streamText>[0], "model"> & {
	model?: string;
};

type StreamTextResult = ReturnType<typeof streamText>;

type StreamObjectArgs = Omit<Parameters<typeof streamObject>[0], "model"> & {
	model?: string;
};

type StreamObjectResult = ReturnType<typeof streamObject>;

export enum AIModel {
	GPT4_O = "gpt-4o",
	GPT4_O_MINI = "gpt-4o-mini",
}

export default class AIService {
	private model: LanguageModel;
	private tokenUsageRecords: TokenUsageRecord[] = [];

	public static create() {
		const config = loadConfig();
		return new AIService({ openai: config.openai });
	}

	constructor(config: Pick<Config, "openai">) {
		this.model = this.createModel(config.openai.gptModel);
	}

	public async streamText(args: StreamTextArgs): Promise<StreamTextResult> {
		const model = args.model ? this.createModel(args.model) : this.model;
		return streamText({ model, ...args });
	}

	public async streamObject(
		args: StreamObjectArgs,
	): Promise<StreamObjectResult> {
		const model = args.model ? this.createModel(args.model) : this.model;
		return streamObject({ model, ...args }) as StreamObjectResult;
	}

	public async generateText(input: {
		prompt: string;
		config?: {
			model?: string;
			temperature?: number;
			system?: string;
			tokenUsageRecord?: Pick<TokenUsageRecord, "title" | "description">;
		};
	}): Promise<string> {
		const { prompt, config } = input;

		const result = await generateText({
			model: config?.model ? openai(config?.model) : this.model,
			system: config?.system,
			prompt,
			temperature: config?.temperature,
		});

		const { tokenUsageRecord } = config ?? {};
		if (tokenUsageRecord) {
			this.tokenUsageRecords = [
				...this.tokenUsageRecords,
				{ ...tokenUsageRecord, ...result.usage, createdAt: new Date() },
			];
		}

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
			tokenUsageRecord?: Pick<TokenUsageRecord, "title" | "description">;
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

		const { tokenUsageRecord } = config ?? {};
		if (tokenUsageRecord) {
			this.tokenUsageRecords = [
				...this.tokenUsageRecords,
				{ ...tokenUsageRecord, ...result.usage, createdAt: new Date() },
			];
		}

		return result.object;
	}

	public writeTokenUsageRecords(pathname: string) {
		const filePath = path.join(process.cwd(), pathname);

		const dir = path.dirname(filePath);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const stats = this.tokenUsageRecords.reduce(
			(result, record) => {
				result.totalPromptTokens += record.promptTokens;
				result.totalCompletionTokens += record.completionTokens;
				result.totalTokens += record.totalTokens;
				return result;
			},
			{
				totalPromptTokens: 0,
				totalCompletionTokens: 0,
				totalTokens: 0,
			},
		);

		const records = this.tokenUsageRecords.reduce((result, record, i) => {
			if (i === 0) {
				result += `
				[Token Usage Records]

				totalRecordNumber: ${this.tokenUsageRecords.length}
				totalPromptTokens: ${stats.totalPromptTokens}
				totalCompletionTokens: ${stats.totalCompletionTokens}
				totalTokens: ${stats.totalTokens}
				`;
			}

			result += `
			***********************************************
				title: ${record.title}
				description: ${record.description}
				promptTokens: ${record.promptTokens}
				completionTokens: ${record.completionTokens}
				totalTokens: ${record.totalTokens}
				createdAt: ${record.createdAt}
			***********************************************
			`;
			return result;
		}, "");

		fs.writeFile(filePath, records, (err) => {
			if (err) {
				console.error(err);
				return;
			}

			console.info(`Token usage records are saved to ${filePath}`);
		});
	}

	private createModel(modelName: string): LanguageModel {
		return openai(modelName);
	}
}
