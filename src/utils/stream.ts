import { CHUNK_DELIMITER } from '@/gateway/streaming/streaming-response';
import { json } from './serialize';

export const createStreamController = (signal: AbortSignal) => {
  let controller: ReadableStreamDefaultController | null = null;

  const stream = new ReadableStream({
    async start(streamController) {
      controller = streamController;

      signal.addEventListener('abort', () => {
        controller?.close();
      });
    },
  });

  return {
    stream,
    sendChunk: async (chunk: any) => {
      if (controller) {
        controller.enqueue(`${json(chunk)}${CHUNK_DELIMITER}`);
      }
    },
    closeStream: async () => {
      controller?.close();
    },
  };
};
