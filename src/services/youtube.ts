import Youtube from '@/libs/youtube';
import { isFailure, Result } from '@/result';
import { YoutubeVideo } from '@/models/youtube';
import youtubeVideoMapper from '@/mappers/youtube';
import youtubeRepo from '@/repositories/youtube';
import { ErrorCode } from '@/gateway/error/error-code';

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
}
