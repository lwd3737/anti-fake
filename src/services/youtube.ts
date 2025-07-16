import Youtube from '@/libs/youtube';
import { isFailure, Result } from '@/result';
import { YoutubeVideo, YoutubeVideoTranscript } from '@/models/youtube';
import youtubeVideoMapper from '@/mappers/youtube';
import youtubeRepo from '@/repositories/youtube';
import { ErrorCode } from '@/gateway/error/error-code';
import { streamObject } from 'ai';
import { AIModel, openai } from '@/libs/ai';
import { z } from 'zod';
import { Failure } from '@/gateway/error/reponse-error-handler';

const ClaimSchema = z.object({
  summary: z.string().describe('유튜브 영상 자막을 요약한 내용'),
});

type TClaimSchema = z.infer<typeof ClaimSchema>;

export default class YoutubeService {
  public async getOrCreateVideo(id: string): Promise<Result<YoutubeVideo>> {
    const found = await youtubeRepo.findVideoById(id);
    if (found) return found;

    const youtube = new Youtube();
    const videoResult = await youtube.getVideo(id);
    if (isFailure(videoResult)) return videoResult;

    const dto = videoResult;
    if (!dto)
      return {
        code: ErrorCode.YOUTUBE_VIDEO_NOT_FOUND,
        message: `Youtube video not found from google server`,
      };

    const newVideo = youtubeVideoMapper.fromDto(dto);
    return await youtubeRepo.createVideo(newVideo);
  }

  public async generateTranscriptFromVideo(
    videoId: string,
    signal: AbortSignal,
  ): Promise<Result<YoutubeVideoTranscript>> {
    const transcriptResult = await Youtube.generateTranscript(videoId, signal);
    if (isFailure(transcriptResult)) {
      const failure = transcriptResult;
      return failure;
    }

    const transcript = transcriptResult;

    try {
      await youtubeRepo.updateTranscript(videoId, transcript);
    } catch (error) {
      return {
        code: ErrorCode.YOUTUBE_TRANSCRIPT_UPDATE_FAILED,
        message: `Failed to update transcript on repository`,
        context: {
          videoId,
          error,
        },
      };
    }

    return transcript;
  }

  public async summarizeTranscript(videoId: string): Promise<Result<string>> {
    const video = await youtubeRepo.findVideoById(videoId);
    if (!video) {
      return {
        code: ErrorCode.YOUTUBE_VIDEO_NOT_FOUND,
        message: `Youtube video not found from repository`,
      };
    }

    if (!video.transcript) {
      return {
        code: ErrorCode.YOUTUBE_TRANSCRIPT_NOT_FOUND,
        message: `Youtube video transcript not found from repository`,
      };
    }

    let summary: string;
    try {
      const summaryResult = streamObject({
        model: openai(AIModel.GPT_4O),
        system: `유튜브 영상 자막을 요약하세요.`,
        prompt: video.transcript,
        schema: ClaimSchema,
        schemaName: 'YoutubeVideoTranscriptSummary',
        schemaDescription: '유튜브 영상 자막을 요약한 내용',
        temperature: 0,
      });
      summary = (await summaryResult.object).summary;
    } catch (error) {
      return {
        code: ErrorCode.YOUTUBE_TRANSCRIPT_SUMMARY_GENERATE_FAILED,
        message: `Failed to generate transcript summary`,
        context: {
          videoId,
          error,
        },
      };
    }

    try {
      await youtubeRepo.updateTranscriptSummary(videoId, summary);
      return summary;
    } catch (error) {
      return {
        code: ErrorCode.YOUTUBE_TRANSCRIPT_SUMMARY_UPDATE_FAILED,
        message: `Failed to update transcript summary on repository`,
        context: {
          videoId,
          error,
        },
      };
    }
  }
}
