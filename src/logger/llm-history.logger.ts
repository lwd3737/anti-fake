import { formatDate } from "@/utils/date";
import { logJsonFile } from "./file";

interface LogInfo {
	title: string;
	description?: string;
}

type HistoryRecord = UsageRecord | ErrorRecord;

interface UsageRecord {
	title: string;
	description?: string;
	model: string;
	prompt: string;
	output: any;
	context?: Record<string, any>;
	tokenUsage: TokenUsage;
	generationTime: number;
	createdAt: string;
}

type RawUsageRecord = Omit<UsageRecord, "generationTime" | "createdAt">;

export interface TokenUsage {
	promptTokens: number;
	completionTokens: number;
	totalTokens: number;
}

interface ErrorRecord {
	code: string;
	error: Error;
	context?: Record<string, any>;
}

export default class LLMHistoryLogger {
	private history: HistoryRecord[] = [];

	constructor(private fileName: string, private info: LogInfo) {
		this.save = this.save.bind(this);
	}

	public async new__monitor(
		task: (
			log: (record: RawUsageRecord) => void,
			error: (record: ErrorRecord) => void,
			save: () => Promise<void>,
		) => Promise<void>,
	): Promise<void> {
		const startedAt = new Date();

		await task(
			(record) => {
				const endedAt = new Date();

				this.history = [
					...this.history,
					{
						...record,
						generationTime: endedAt.getTime() - startedAt.getTime(),
						createdAt: endedAt.toISOString(),
					},
				];
			},
			(record) => {
				this.history = [...this.history, record];
			},
			this.save,
		);
	}

	public async monitor(
		task: () => Promise<
			Omit<UsageRecord, "generationTime" | "createdAt"> | ErrorRecord
		>,
	) {
		const startedAt = new Date();

		const record = await task();
		if (this.isError(record)) {
			this.history = [...this.history, record];
		}

		const endedAt = new Date();

		this.history = [
			...this.history,
			{
				...record,
				generationTime: endedAt.getTime() - startedAt.getTime(),
				createdAt: new Date().toISOString(),
			},
		];
	}

	private isError(
		record: Omit<HistoryRecord, "generationTime" | "createdAt">,
	): record is ErrorRecord {
		return (record as ErrorRecord).code !== undefined;
	}

	public async save(): Promise<void> {
		const createdAt = new Date();

		await logJsonFile(`logs/${this.fileName}-${formatDate(createdAt)}.json`, {
			...this.info,
			usageHistory: this.history,
			createdAt,
		});

		this.history = [];
	}
}
