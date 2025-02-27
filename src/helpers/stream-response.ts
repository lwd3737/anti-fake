export const streamResponse = (
	callback: (helpers: {
		send: (chunk: any) => void;
		close: () => void;
	}) => void | Promise<void>,
	signal?: AbortSignal,
) => {
	return new Response(
		new ReadableStream({
			async start(controller) {
				signal?.addEventListener("abort", () => {
					controller.close();
				});

				callback({
					send(chunk) {
						controller.enqueue(chunk);
					},
					close() {
						controller.close();
					},
				});
			},
		}),
	);
};
