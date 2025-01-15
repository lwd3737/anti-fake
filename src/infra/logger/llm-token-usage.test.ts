import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import LLMTokenUsageLogger, {
	TokenUsageRecord,
	TokenUsageError,
} from "./llm-token-usage";
import { logJsonFile } from "./file";

vi.mock("./file");

describe("LLMTokenUsageLogger", () => {
	const path = "/path/to/log.json";
	const info = { title: "Test Title", description: "Test Description" };
	let logger: LLMTokenUsageLogger;

	beforeEach(() => {
		logger = new LLMTokenUsageLogger(path, info);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should log a TokenUsageRecord", () => {
		const record: TokenUsageRecord = {
			title: "Record Title",
			description: "Record Description",
			model: "gpt-4o-mini",
			totalTokens: 100,
			promptTokens: 50,
			completionTokens: 50,
			createdAt: new Date().toISOString(),
		};

		logger.log(record);

		expect(logger["history"]).toContain(record);
	});

	it("should log a TokenUsageError", () => {
		const error = new Error("Test Error");
		const context = { key: "value" };

		logger.error("ERROR_CODE", error, context);

		const loggedError: TokenUsageError = {
			errorCode: "ERROR_CODE",
			message: `${error.name}:${error.message}`,
			stack: error.stack?.split("\n").map((line) => line.trim()),
			cause: error.cause,
			context,
		};

		expect(logger["history"]).toContainEqual(loggedError);
	});

	it("should save the log to a file and clear history", async () => {
		const record: TokenUsageRecord = {
			title: "Record Title",
			description: "Record Description",
			model: "gpt-4o",
			totalTokens: 100,
			promptTokens: 50,
			completionTokens: 50,
			createdAt: new Date().toISOString(),
		};

		logger.log(record);

		await logger.save();

		expect(logJsonFile).toHaveBeenCalledWith(
			path,
			expect.objectContaining({
				title: info.title,
				description: info.description,
				usageHistory: [record],
			}),
		);

		expect(logger["history"]).toHaveLength(0);
	});
});
