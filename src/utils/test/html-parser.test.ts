import { describe, it, expect, beforeAll } from "vitest";
import { parseHtml } from "../html-parser";

describe("html-parser", () => {
	describe("when html document is very large", () => {
		let originHtml: string;

		beforeAll(async () => {
			const res = await fetch(
				"https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%8A%B9%EB%A7%8C",
			);
			originHtml = await res.text();
		});

		it("should reduce the original size by at least 80%", () => {
			const result = parseHtml(originHtml);

			console.info("originHtml length:", originHtml.length);
			console.info("parsed lengt:", result.length);

			expect(result.length).lessThan(originHtml.length * 0.2);
		});
	});
});
