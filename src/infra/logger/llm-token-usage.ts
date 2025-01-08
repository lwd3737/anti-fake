import { AIModel } from "@/helpers/ai";
import { LanguageModelUsage } from "ai";
import { logJsonFile } from "./file";

export interface TokenUsageLogData {
	createdAt: string;
	title: string;
	description?: string;
	totalUsage: TokenUsage;
	totalCost?: TokenUsageCost;
	usageHistory: (TokenUsageRecord | TokenUsageError)[];
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
	name: string;
	message: string;
}

export default class LLMTokenUsageLogger {
	private history: (TokenUsageRecord | TokenUsageError)[] = [];

	constructor(
		private path: string,
		private info: Pick<TokenUsageLogData, "title" | "description">,
	) {}

	public log(record: TokenUsageRecord | TokenUsageError): this {
		this.history = [...this.history, record];
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
