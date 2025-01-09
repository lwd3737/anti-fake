import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import LLMTokenUsageLogger, {
	TokenUsageRecord,
	TokenUsageError,
} from "../llm-token-usage";
import { logJsonFile } from "../file";
import fs from "fs";
import { join } from "path";

vi.mock("./file");

describe("LLMTokenUsageLogger", () => {
	const path = "/logs/test.json";
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
			createdAt: new Date().toISOString(),
			promptTokens: 100,
			completionTokens: 200,
			totalTokens: 300,
		};

		logger.log(record);

		expect(logger["history"]).toContain(record);
	});

	it("should log a TokenUsageError", () => {
		const error = new Error("test");
		logger.error("test", error);

		expect(logger["history"]).toContain(error);
	});

	it("should save the log to a file", async () => {
		const record: TokenUsageRecord = {
			title: "Record Title",
			description: "Record Description",
			model: "gpt-4o-mini",
			createdAt: new Date().toISOString(),
			promptTokens: 100,
			completionTokens: 200,
			totalTokens: 300,
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

		expect(fs.existsSync(join(process.cwd(), path))).toBe(true);
	});
});
