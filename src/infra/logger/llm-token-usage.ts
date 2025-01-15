import { AIModel } from "@/helpers/ai";
import { LanguageModelUsage } from "ai";
import { logJsonFile } from "./file";

export interface TokenUsageLogData {
	title: string;
	description?: string;
	totalUsage: TokenUsage;
	totalCost?: TokenUsageCost;
	history: (TokenUsageRecord | TokenUsageError)[];
	createdAt: string;
}

export type TokenUsage = LanguageModelUsage;

export interface TokenUsageCost {
	amount: number;
	currency: string;
}

export type TokenUsageRecord = TokenUsage & {
	model?: AIModel;
	title: string;
	description?: string;
	cost?: TokenUsageCost;
	createdAt: string;
};

export interface TokenUsageError {
	errorCode: string;
	message: string;
	stack?: string[];
	cause?: any;
	context?: Record<string, any>;
}

export default class LLMTokenUsageLogger {
	private history: (TokenUsageRecord | TokenUsageError)[] = [];

	constructor(
		private path: string,
		private info: Pick<TokenUsageLogData, "title" | "description">,
	) {}

	// TODO: createdAt은 자동 생성
	public log(record: TokenUsageRecord): this {
		this.history = [...this.history, record];
		return this;
	}

	public error(
		code: string,
		error: Error,
		context?: Record<string, any>,
	): this {
		console.error(error);

		const stack = error.stack?.split("\n").map((line) => line.trim());

		this.history = [
			...this.history,
			{
				errorCode: code,
				message: `${error.name}:${error.message}`,
				stack,
				cause: error.cause,
				context,
			},
		];

		return this;
	}

	public async save(): Promise<void> {
		await logJsonFile(this.path, {
			createdAt: new Date().toISOString(),
			...this.info,
			usageHistory: this.history,
		});

		this.history = [];
	}
}
