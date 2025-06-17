import loadConfig from '@/config';
import {
  SearchVideoChannelDto,
  SearchVideosDto,
  VideoDto,
} from '@/gateway/dto/youttube';
import { GaxiosResponse } from 'gaxios';
import { Auth, google, youtube_v3 } from 'googleapis';
import { YoutubeTranscript } from 'youtube-transcript';
import {
  GoogleApisError,
  isGoogleApisError,
} from '@/gateway/error/google-apis-error';
import { authService } from '.';
import { Result } from '@/result';
import { ErrorCode } from '@/gateway/error/error-code';
import YTDlpWrap from 'yt-dlp-wrap';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import os from 'os';
import { YoutubeVideoTranscription } from '@/models/youtube';

export default class YoutubeService {
  private youtube: youtube_v3.Youtube;

  public static async generateTranscript(
    videoId: string,
    signal?: AbortSignal,
  ): Promise<Result<YoutubeVideoTranscription>> {
    const ffmpegPath = path.join(process.cwd(), 'bin', 'ffmpeg');
    if (!fs.existsSync(ffmpegPath)) {
      throw new Error(
        'ffmpeg binary not found. Please run npm run init first.',
      );
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const ytDlp = new YTDlpWrap(path.join(process.cwd(), 'bin', 'yt-dlp'));

    const tempDir = os.tmpdir();
    const tempFile = path.join(tempDir, `${videoId}.mp3`);
    fs.mkdirSync(tempDir, { recursive: true });

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

    try {
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
        `"file=@${tempFile}"`,
        '-F',
        '"model=whisper-1"',
        '-F',
        '"language=ko"',
        '-F',
        '"response_format=verbose_json"',
        '-F',
        '"temperature=0"',
        // '--max-time',
        // '120',
      ].join(' ');

      const { stdout, stderr } = await execAsync(curlCommand);

      if (stderr) console.debug('Curl stderr:', stderr);

      try {
        const transcription = JSON.parse(stdout);

        if (transcription.error) {
          throw new Error(transcription.error.message);
        }
        return transcription;
      } catch (parseError) {
        console.error('Failed to parse transcription:', parseError);
        throw parseError;
      }
    } catch (error) {
      const message = 'Failed to transcribe audio';
      console.error(message, error);

      if (axios.isAxiosError(error)) console.error(error.response?.data);

      return {
        code: ErrorCode.OPENAI_TRANSCRIPTION_FAILED,
        error: error instanceof Error ? error.message : message,
      };
    }
  }

  public static create(): YoutubeService {
    return new YoutubeService(authService.client);
  }
  constructor(googleAuth: Auth.OAuth2Client) {
    this.youtube = google.youtube({
      version: 'v3',
      auth: googleAuth,
    });
  }

  public async getVideo(id: string): Promise<VideoDto | GoogleApisError> {
    try {
      const res = await this.youtube.videos.list({
        part: ['id', 'snippet'],
        id: [id],
      });
      if (this.isFailed(res)) {
        throw new Error(`Youtube video search is failed: ${res.statusText}`);
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
      if (!video) {
        throw new Error(`Youtube video not found: ${id}`);
      }

      return video;
    } catch (error) {
      if (isGoogleApisError(error)) {
        return error;
      }

      throw error;
    }
  }

  public async searchChannel(name: string): Promise<SearchVideoChannelDto[]> {
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
  ): Promise<SearchVideosDto> {
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
