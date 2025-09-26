import loadConfig from '@/config';
import {
  SearchYoutubeVideoChannelDto,
  SearchYoutubeVideosDto,
  YoutubeVideoDto,
} from '@/gateway/dto/youttube';
import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import { authService } from '../services';
import { isFailure, Result } from '@/result';
import { ErrorCode } from '@/gateway/error/error-code';
import YTDlpWrap from 'yt-dlp-wrap';
import path from 'path';
import os from 'os';
import { YoutubeVideoTranscript } from '@/models/youtube';
import { experimental_transcribe as transcribe } from 'ai';
import { openai } from './ai';
import { mkdir, readdir } from 'fs/promises';
import { existsSync, chmodSync, createReadStream } from 'fs';
import { execSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import axios, { AxiosError } from 'axios';
import FormData from 'form-data';

interface WhisperTranscription {
  task: string;
  language: string;
  text: string;
  duration: number;
  segments: {
    id: string;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
  }[];
}

export type GenerateTranscriptErrorCode =
  | ErrorCode.YOUTUBE_TRANSCRIPTION_FAILED
  | ErrorCode.OPENAI_TRANSCRIPTION_FAILED;

export default class Youtube {
  private youtube: youtube_v3.Youtube;

  public static async generateTranscript(
    videoId: string,
    signal?: AbortSignal,
  ): Promise<Result<YoutubeVideoTranscript, GenerateTranscriptErrorCode>> {
    const downloadResult = await this.downloadAudio(videoId, signal);
    if (isFailure(downloadResult)) {
      const error = downloadResult;
      return error;
    }

    const { filePath, dirPath } = downloadResult;

    const chunkDir = path.join(dirPath, `${videoId}_chunks`);
    await mkdir(chunkDir, { recursive: true });
    const chunkDuration = 600; // 10분
    const inputExt = '.m4a';
    const ffmpegSegmentationPath = this.resolveFfmpegPath();
    execSync(
      `${ffmpegSegmentationPath} -i "${filePath}" -f segment -segment_time ${chunkDuration} -c copy -reset_timestamps 1 "${chunkDir}/chunk_%03d${inputExt}"`,
      { stdio: 'ignore' },
    );
    const chunkFiles = (await readdir(chunkDir)).sort();
    const chunkPaths = chunkFiles.map((fileName) =>
      path.join(chunkDir, fileName),
    );
    const chunks = await Promise.all(
      chunkPaths.map((filePath) => this.transcribeByCLI(filePath)),
    );

    const transcript = this.mergeTranscriptChunks(chunks);

    return transcript;
  }

  public static async downloadAudio(
    videoId: string,
    signal?: AbortSignal,
  ): Promise<
    Result<
      { dirPath: string; filePath: string },
      ErrorCode.YOUTUBE_TRANSCRIPTION_FAILED
    >
  > {
    const resolvedFfmpeg = this.resolveFfmpegPath();

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const ytDlp = new YTDlpWrap(path.join(process.cwd(), 'bin', 'yt-dlp'));

    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `${videoId}.m4a`);
    await mkdir(tempDir, { recursive: true });

    // Download using yt-dlp only, in m4a (AAC in MP4)
    try {
      const args = [
        url,
        '-f',
        'bestaudio[ext=m4a]/bestaudio/best',
        '--extract-audio',
        '--audio-format',
        'm4a',
        '--audio-quality',
        '0',
        '--no-playlist',
        '--no-check-certificates',
        '--user-agent',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        '--verbose',
        '-o',
        tempFile,
      ];

      // Only pass ffmpeg-location if we have an absolute/existing path (not just 'ffmpeg')
      if (resolvedFfmpeg !== 'ffmpeg' && existsSync(resolvedFfmpeg)) {
        args.splice(
          args.indexOf('--verbose'),
          0,
          '--ffmpeg-location',
          resolvedFfmpeg,
        );
      }

      await ytDlp.execPromise(args, { signal });
    } catch (error) {
      console.error('yt-dlp execution failed:', error);
      console.error(
        'Command:',
        `${path.join(process.cwd(), 'bin', 'yt-dlp')} ${url} -f bestaudio[ext=m4a]/bestaudio/best --extract-audio --audio-format m4a --audio-quality 0 --no-playlist --no-check-certificates --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" ${
          resolvedFfmpeg !== 'ffmpeg' && existsSync(resolvedFfmpeg)
            ? `--ffmpeg-location ${resolvedFfmpeg} `
            : ''
        }--verbose -o ${tempFile}`,
      );
      throw error;
    }

    return {
      dirPath: tempDir,
      filePath: tempFile,
    };
  }

  private static resolveFfmpegPath(): string {
    // Prefer system ffmpeg if available (installed in Docker via apk)
    try {
      execSync('command -v ffmpeg', { stdio: 'ignore' });
      return 'ffmpeg';
    } catch {}

    // Fall back to ffmpeg-static path if it exists
    const staticPath = ffmpeg ?? path.join(process.cwd(), 'bin', 'ffmpeg');
    try {
      if (staticPath && existsSync(staticPath)) {
        chmodSync(staticPath, 0o755);
        return staticPath;
      }
    } catch {}

    // Last resort: let PATH resolution try
    return 'ffmpeg';
  }

  // INFO: sdk 라이브러리 사용 시 오류 발생
  public static async transcribeBySDK(
    buffer: Buffer,
  ): Promise<YoutubeVideoTranscript> {
    const transcript = await transcribe({
      model: openai.transcription('whisper-1'),
      audio: buffer,
    });

    transcript.warnings.forEach((warning) => {
      console.warn('warning', warning);
    });

    const { text, segments, durationInSeconds } = transcript;

    return {
      text,
      duration: durationInSeconds ?? 0,
      segments: segments.map(({ text, startSecond, endSecond }) => ({
        text,
        start: startSecond,
        end: endSecond,
      })),
    };
  }

  public static async transcribeByCLI(
    filePath: string,
    // previousSegmentText?: string,
  ): Promise<YoutubeVideoTranscript> {
    const form = new FormData();
    form.append('file', createReadStream(filePath), {
      filename: path.basename(filePath),
      contentType: 'audio/m4a',
    });
    form.append('model', 'whisper-1');
    form.append('language', 'ko');
    form.append('response_format', 'verbose_json');
    form.append('temperature', '0');

    try {
      const { data } = await axios.post<WhisperTranscription>(
        'https://api.openai.com/v1/audio/transcriptions',
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${loadConfig().openai.apiKey}`,
          },
          maxBodyLength: Infinity,
        },
      );

      const transcription = data as WhisperTranscription;
      const { text, duration, segments } = transcription;

      return {
        text,
        duration,
        segments: segments.map(({ text, start, end }) => ({
          text,
          start,
          end,
        })),
      };
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error(
        'whisper transcription failed: ',
        axiosError.response?.data,
      );
      throw error;
    }
  }

  private static mergeTranscriptChunks(
    chunks: YoutubeVideoTranscript[],
  ): YoutubeVideoTranscript {
    return chunks.reduce<YoutubeVideoTranscript>(
      (result, chunk, idx) => {
        if (idx === 0) {
          const { text, duration, segments } = chunk;
          return {
            text,
            duration,
            segments,
          };
        }

        const prevChunkSegment = result.segments[result.segments.length - 1];
        const timeOffset = prevChunkSegment.end;

        const adjustedChunkSegments = chunk.segments.map((segment) => ({
          ...segment,
          start: segment.start + timeOffset,
          end: segment.end + timeOffset,
        }));

        return {
          text: result.text + ' ' + chunk.text,
          duration: result.duration + chunk.duration,
          segments: [...result.segments, ...adjustedChunkSegments],
        };
      },
      {
        text: '',
        duration: 0,
        segments: [],
      },
    );
  }

  constructor() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: authService.client,
    });
  }

  public async getVideo(
    id: string,
  ): Promise<
    Result<YoutubeVideoDto | null, ErrorCode.YOUTUBE_VIDEO_GET_FAILED>
  > {
    try {
      const res = await this.youtube.videos.list({
        part: ['id', 'snippet'],
        id: [id],
      });
      if (this.isFailed(res)) {
        return {
          code: ErrorCode.YOUTUBE_VIDEO_GET_FAILED,
          message: `Youtube video get failed from google server`,
          context: {
            videoId: id,
            error: res.statusText,
          },
        };
      }

      const video = res.data.items?.map((item) => {
        const {
          title,
          description,
          thumbnails,
          channelId,
          channelTitle,
          publishedAt,
        } = item.snippet!;

        return {
          id: item.id!,
          title: title!,
          description: description!,
          channelId: channelId!,
          channelTitle: channelTitle!,
          thumbnail: {
            url: thumbnails!.default!.url!,
            width: thumbnails!.default!.width!,
            height: thumbnails!.default!.height!,
          },
          publishedAt: publishedAt!,
        };
      })[0];
      if (!video) return null;

      return video;
    } catch (error) {
      return {
        code: ErrorCode.YOUTUBE_VIDEO_GET_FAILED,
        message: `Youtube video get failed from google server`,
        context: {
          videoId: id,
          error,
        },
      };
    }
  }

  public async searchChannel(
    name: string,
  ): Promise<SearchYoutubeVideoChannelDto[]> {
    const res = await this.youtube.search.list({
      part: ['snippet'],
      type: ['channel'],
      q: name,
    });

    if (this.isFailed(res)) {
      throw new Error(`Youtube channel search is failed: ${res.statusText}`);
    }

    return (
      res.data.items?.map((item) => {
        const { channelId, channelTitle, description, thumbnails } =
          item.snippet!;
        return {
          channelId: channelId!,
          channelTitle: channelTitle!,
          description: description!,
          thumbnail: {
            url: thumbnails!.default!.url!,
            width: thumbnails!.default!.width!,
            height: thumbnails!.default!.height!,
          },
        };
      }) ?? []
    );
  }

  public async searchVideos(
    keyword: string,
    options?: {
      channelId: string;
      nextPageToken: string;
      dateRange: { startDate: string; endDate: string };
    },
  ): Promise<SearchYoutubeVideosDto> {
    const res = await this.youtube.search.list({
      part: ['id'],
      channelId: options?.channelId,
      type: ['video'],
      q: keyword,
      maxResults: 10,
      pageToken: options?.nextPageToken,
      publishedBefore: options?.dateRange?.endDate,
      publishedAfter: options?.dateRange?.startDate,
    });

    if (this.isFailed(res)) {
      throw new Error(`Youtube video search is failed: ${res.statusText}`);
    }

    const videos =
      res.data.items?.map((item) => {
        const {
          channelId,
          channelTitle,
          description,
          thumbnails,
          publishedAt,
        } = item.snippet!;
        return {
          channelId: channelId!,
          channelTitle: channelTitle!,
          videoId: item.id!.videoId!,
          description: description!,
          thumbnail: {
            url: thumbnails!.default!.url!,
            width: thumbnails!.default!.width!,
            height: thumbnails!.default!.height!,
          },
          publishedAt: publishedAt!,
        };
      }) ?? [];

    return {
      nextPageToken: res.data.nextPageToken!,
      videos,
    };
  }

  private isFailed(res: GaxiosResponse): boolean {
    return res.status >= 400;
  }
}
