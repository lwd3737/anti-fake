import Youtube, { GenerateTranscriptErrorCode } from '@/libs/youtube';
import { isFailure, Result } from '@/result';
import { YoutubeVideo, YoutubeVideoTranscript } from '@/models/youtube';
import { youtubeVideoMapper } from '@/mappers/youtube';
import youtubeRepo from '@/repositories/youtube';
import { ErrorCode } from '@/gateway/error/error-code';
import { generateText } from 'ai';
import { AIModel, openai } from '@/libs/ai';

export type GetOrCreateVideoErrorCode =
  | ErrorCode.YOUTUBE_VIDEO_GET_FAILED
  | ErrorCode.YOUTUBE_VIDEO_NOT_FOUND
  | GenerateTranscriptErrorCode;

export default class YoutubeService {
  public async getOrCreateVideo(
    id: string,
  ): Promise<Result<Required<YoutubeVideo>, GetOrCreateVideoErrorCode>> {
    const found = await youtubeRepo.findVideoById(id);
    if (found) return found as Required<YoutubeVideo>;

    const youtube = new Youtube();
    const videoResult = await youtube.getVideo(id);
    if (isFailure(videoResult)) {
      const failure = videoResult;
      return failure;
    }

    const video = videoResult;
    if (!video)
      return {
        code: ErrorCode.YOUTUBE_VIDEO_NOT_FOUND,
        message: `Youtube video not found from google server`,
      };

    const transcriptResult = await this.generateTranscriptFromVideo(id);
    if (isFailure(transcriptResult)) {
      const failure = transcriptResult;
      return failure;
    }

    const transcript = transcriptResult;
    const dto = youtubeVideoMapper.fromDto(video);

    return (await youtubeRepo.createVideo({
      ...dto,
      transcript: transcript.original,
      transcriptSummary: transcript.summary,
    })) as Required<YoutubeVideo>;
  }

  private async generateTranscriptFromVideo(
    videoId: string,
    signal?: AbortSignal,
  ): Promise<
    Result<
      { original: YoutubeVideoTranscript; summary: string },
      GenerateTranscriptErrorCode
    >
  > {
    const transcriptResult = await Youtube.generateTranscript(videoId, signal);
    if (isFailure(transcriptResult)) {
      const failure = transcriptResult;
      return failure;
    }

    const transcript = transcriptResult;

    let summary: string;
    try {
      const summaryResult = await generateText({
        model: openai(AIModel.GPT_4O),
        system: `유튜브 영상 자막을 한국어로 요약합니다.`,
        prompt: transcript.text,
        temperature: 0,
      });
      summary = summaryResult.text;
    } catch (error) {
      return {
        code: ErrorCode.OPENAI_TRANSCRIPTION_FAILED,
        message: `Failed to generate transcript summary`,
        context: {
          videoId,
          error,
        },
      };
    }

    return { original: transcript, summary: summary };
  }

  public async getTranscript(
    videoId: string,
  ): Promise<Result<YoutubeVideoTranscript>> {
    const found = await youtubeRepo.findVideoById(videoId);
    if (!found)
      return {
        code: ErrorCode.YOUTUBE_VIDEO_NOT_FOUND,
        message: `Youtube video not found`,
      };

    return found.transcript;
  }
}
