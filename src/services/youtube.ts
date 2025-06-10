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

export default class YoutubeService {
  private youtube: youtube_v3.Youtube;

  public static async downloadSubtitle(
    videoId: string,
  ): Promise<Result<string>> {
    const { devMode: new__devMode } = loadConfig();

    if (new__devMode.youtubeSubtitleDownload ?? new__devMode.default) {
      const mock = await import('/mock/subtitle.json');
      return mock.subtitle;
    }

    const transcripts = await YoutubeTranscript.fetchTranscript(videoId);
    const subtitle = transcripts.reduce(
      (transcript, segment) => transcript + segment.text,
      '',
    );
    if (subtitle.length === 0)
      return {
        code: ErrorCode.YOUTUBE_SUBTITLE_DOWNLOAD_FAILED,
        error: 'No subtitle found',
      };

    return subtitle;
  }

  public static async generateTranscript(
    videoId: string,
  ): Promise<Result<string>> {}

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
