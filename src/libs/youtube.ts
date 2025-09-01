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
import { mkdir, readdir, readFile } from 'fs/promises';
import { existsSync, chmodSync, copyFileSync } from 'fs';
import { execSync, spawn } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import ytdl from 'ytdl-core';

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
    let ffmpegPathForSeg =
      (ffmpeg as unknown as string) ||
      path.join(process.cwd(), 'bin', 'ffmpeg');
    try {
      if (ffmpegPathForSeg && existsSync(ffmpegPathForSeg)) {
        // Vercel의 /var/task는 read-only일 수 있으므로 /tmp로 복사 후 실행
        if (ffmpegPathForSeg.startsWith('/var/task') || process.env.VERCEL) {
          const tmpFfmpeg = path.join(os.tmpdir(), 'ffmpeg');
          try {
            copyFileSync(ffmpegPathForSeg, tmpFfmpeg);
            chmodSync(tmpFfmpeg, 0o755);
            ffmpegPathForSeg = tmpFfmpeg;
          } catch {}
        } else {
          chmodSync(ffmpegPathForSeg, 0o755);
        }
      }
    } catch {}
    execSync(
      `${ffmpegPathForSeg} -i "${filePath}" -f segment -segment_time ${chunkDuration} -c copy "${chunkDir}/chunk_%03d.mp3"`,
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
    let ffmpegPath =
      (ffmpeg as unknown as string) ||
      path.join(process.cwd(), 'bin', 'ffmpeg');
    try {
      if (ffmpegPath && existsSync(ffmpegPath)) {
        if (ffmpegPath.startsWith('/var/task') || process.env.VERCEL) {
          const tmpFfmpeg = path.join(os.tmpdir(), 'ffmpeg');
          try {
            copyFileSync(ffmpegPath, tmpFfmpeg);
            chmodSync(tmpFfmpeg, 0o755);
            ffmpegPath = tmpFfmpeg;
          } catch {}
        } else {
          chmodSync(ffmpegPath, 0o755);
        }
      }
    } catch {}
    if (!ffmpegPath || !existsSync(ffmpegPath)) {
      return {
        code: ErrorCode.YOUTUBE_TRANSCRIPTION_FAILED,
        message: 'ffmpeg binary not found. Ensure ffmpeg-static is installed.',
        context: {
          videoId,
        },
      };
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const ytDlp = new YTDlpWrap(path.join(process.cwd(), 'bin', 'yt-dlp'));

    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `${videoId}.mp3`);
    await mkdir(tempDir, { recursive: true });

    const useYtdlpFirst = !process.env.VERCEL; // Vercel에서는 우선 ytdl-core 사용 권장

    const tryYtDlp = async () => {
      await ytDlp.execPromise(
        [
          url,
          '-f',
          'bestaudio',
          '--extract-audio',
          '--audio-format',
          'mp3',
          '--audio-quality',
          '0',
          '--no-playlist',
          '--ffmpeg-location',
          ffmpegPath,
          '-o',
          tempFile,
        ],
        {
          signal,
        },
      );
    };

    const tryYtdlCore = async () => {
      await new Promise<void>((resolve, reject) => {
        const ff = spawn(ffmpegPath, [
          '-y',
          '-i',
          'pipe:0',
          '-vn',
          '-acodec',
          'libmp3lame',
          '-b:a',
          '192k',
          tempFile,
        ]);

        ff.on('error', reject);
        ff.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`ffmpeg exited with code ${code}`));
        });

        const stream = ytdl(url, {
          filter: 'audioonly',
          quality: 'highestaudio',
          requestOptions: { headers: { 'user-agent': 'Mozilla/5.0' } },
          highWaterMark: 1 << 25,
        });
        stream.on('error', reject);
        stream.pipe(ff.stdin);
      });
    };

    try {
      if (useYtdlpFirst) {
        await tryYtDlp();
      } else {
        await tryYtdlCore();
      }
    } catch (firstErr) {
      try {
        if (useYtdlpFirst) await tryYtdlCore();
        else await tryYtDlp();
      } catch (secondErr) {
        return {
          code: ErrorCode.YOUTUBE_TRANSCRIPTION_FAILED,
          message: 'Failed to download audio (both methods failed)',
          context: {
            videoId,
            detail: { firstErr, secondErr },
          },
        };
      }
    }

    return {
      dirPath: tempDir,
      filePath: tempFile,
    };
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
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    const curlCommand = [
      'curl',
      '-X POST',
      'https://api.openai.com/v1/audio/transcriptions',
      '-H',
      `"Authorization: Bearer ${loadConfig().openai.apiKey}"`,
      '-H',
      '"Content-Type: multipart/form-data"',
      '-F',
      `"file=@${filePath}"`,
      '-F',
      '"model=whisper-1"',
      '-F',
      '"language=ko"',
      '-F',
      '"response_format=verbose_json"',
      '-F',
      '"temperature=0"',
    ].join(' ');

    const { stdout, stderr } = await execAsync(curlCommand);
    if (stderr) console.debug('Curl stderr:', stderr);

    const transcription = JSON.parse(stdout) as WhisperTranscription;
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
