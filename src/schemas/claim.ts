import z from 'zod';

export const ClaimSchema = z.object({
  content: z.string().describe('검증 가능한 주장의 핵심 내용'),
  context: z
    .string()
    .describe('주장을 이해하기 위한 맥락 정보 (주제, 배경, 관련 상황 등)'),
  detectionReason: z
    .string()
    .describe(
      '이 주장이 사실 검증이 가능하고 가치가 있다고 판단한 근거를 설명합니다',
    ),
  startAt: z.number().describe('주장이 시작되는 시간(초)'),
  endAt: z.number().describe('주장이 끝나는 시간(초)'),
});

export type ClaimSchema = z.infer<typeof ClaimSchema>;
