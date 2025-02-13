import { AIModel } from "@/helpers/ai";
import { logJsonFile } from "./file";

export interface LLMPromptLogData {
	title: string;
	description?: string;
	history: PromptHistory;
	generatationTime: number; // ms
	createdAt: string;
}

export type PromptHistory = (PromptRecord | PromptError)[];

export interface PromptRecord {
	title: string;
	description?: string;
	model: string;
	system: string;
	prompt: string;
	output: any;
	context?: Record<string, any>;
	generatationTime: number; // ms
	createdAt: string;
}

export interface PromptError {
	errorCode: string;
	message: string;
	stack?: string[];
	cause?: any;
	context?: Record<string, any>;
}

// TODO: history logger로 일반화
export default class LLMPromptLogger {
	private history: PromptHistory = [];

	constructor(
		private path: string,
		private info: Pick<LLMPromptLogData, "title" | "description">,
	) {}

	public log(record: Omit<PromptRecord, "createdAt">): this {
		this.history = [
			...this.history,
			{ ...record, createdAt: new Date().toISOString() },
		];

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
				message: `${error.name}: ${error.message}`,
				stack,
				cause: error.cause,
				context,
			},
		];

		return this;
	}

	public async save(): Promise<void> {
		const generationTime = this.history
			.filter<PromptRecord>((record) => "title" in record)
			.reduce((result, record) => {
				return result + record.generatationTime;
			}, 0);

		await logJsonFile(this.path, {
			createdAt: new Date().toISOString(),
			...this.info,
			history: this.history,
			generationTime,
		});

		this.history = [];
	}
}
