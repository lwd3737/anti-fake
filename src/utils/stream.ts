import { CHUNK_DELIMITER } from '@/gateway/streaming/stream-response';
import { json } from './serialize';

export const createStreamController = (signal: AbortSignal) => {
  let send: (chunk: any) => void;
  let close: () => void;

  const stream = new ReadableStream({
    async start(controller) {
      signal.addEventListener('abort', () => {
        controller.close();
      });

      send = (chunk) => {
        controller.enqueue(`${json(chunk)}${CHUNK_DELIMITER}`);
      };

      close = () => {
        controller.close();
      };
    },
  });

  return {
    stream,
    sendChunk: (chunk: any) => send(chunk),
    closeStream: () => close(),
  };
};
