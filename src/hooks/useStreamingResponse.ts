import { json } from "@/utils/serialize";
import assert from "assert";
import { useCallback, useRef, useState } from "react";

const useStreamingResponse = (onCompleted: (chunk: unknown[]) => void) => {
	const memoizedOnCompleted = useRef(onCompleted);

	const aborterRef = useRef(new AbortController());
	const aborter = aborterRef.current;

	// 로딩 상태를 실시간 반영하기 위해 추가
	const isLoadingRef = useRef(false);
	const [isLoading, setIsLoading] = useState(false);

	const startStreaming = useCallback(
		async (path: string, payload: unknown) => {
			assert(!path.startsWith("/api/"), "path must not start with /api/");
			assert(!path.startsWith("/"), "path must not start with /");

			if (isLoadingRef.current) return;

			isLoadingRef.current = true;
			setIsLoading(true);

			try {
				const res = await fetch(`/api/${path}`, {
					method: "POST",
					body: json(payload),
					signal: aborter.signal,
				});

				const stream = res.body;
				if (!stream) {
					throw new Error("Stream is null");
				}

				const reader = stream.getReader();
				const decoder = new TextDecoder();

				let incompletedChunk = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						break;
					}

					const decoded = decoder.decode(value, { stream: true });
					const chunks = decoded.split("\n");
					incompletedChunk += chunks.pop();
					const parsedChunks = chunks.map((chunk, idx) => {
						const completedChunk = idx === 0 ? incompletedChunk + chunk : chunk;
						incompletedChunk = "";

						return JSON.parse(completedChunk);
					});

					memoizedOnCompleted.current(parsedChunks);

					// setChunks((prev) => [...prev, ...parsedChunks]);
				}

				isLoadingRef.current = false;
				setIsLoading(false);
			} catch (e) {
				if ((e as Error).name === "AbortError") {
					return;
				}
			} finally {
				isLoadingRef.current = false;
				setIsLoading(false);
			}
		},
		[aborter.signal],
	);

	const stopStreaming = useCallback(() => {
		aborter.abort();
		isLoadingRef.current = false;
		setIsLoading(false);
	}, [aborter]);

	return {
		isLoading,
		startStreaming,
		stopStreaming,
	};
};

export default useStreamingResponse;
