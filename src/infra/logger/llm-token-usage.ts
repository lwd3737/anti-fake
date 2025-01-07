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

type TokenUsage = LanguageModelUsage;

interface TokenUsageCost {
	amount: number;
	currency: string;
}

type TokenUsageRecord = TokenUsage & {
	model?: AIModel;
	title: string;
	description?: string;
	cost?: TokenUsageCost;
	createdAt: string;
};

interface TokenUsageError {
	name: string;
	message: string;
}

export default class LLMTokenUsageLogger {
	private history: (TokenUsageRecord | TokenUsageError)[] = [];

	constructor(
		private path: string,
		private info: Pick<TokenUsageLogData, "title" | "description">,
	) {}

	public log(record: TokenUsageRecord | TokenUsageError): void {
		this.history = [...this.history, record];
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
