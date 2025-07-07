import youtubeVideoMapper from '@/mappers/youtube';
import prisma from './prisma';
import { Prisma } from '/prisma/generated/prisma';
import { YoutubeVideo } from '@/models/youtube';

export const createYoutubeVideo = async (
  data: Prisma.YoutubeVideoCreateInput,
  select?: Prisma.YoutubeVideoSelect,
) => {
  return await prisma.youtubeVideo.create({
    data,
    select,
  });
};

const youtubeRepo = {
  async getVideos(ids: string[]): Promise<YoutubeVideo[]> {
    const found = await prisma.youtubeVideo.findMany({
      where: {
        id: { in: ids },
      },
    });
    return found.map(youtubeVideoMapper.toDomain);
  },

  async getVideo(id: string): Promise<YoutubeVideo | null> {
    const found = await prisma.youtubeVideo.findUnique({
      where: {
        id,
      },
    });

    return found ? youtubeVideoMapper.toDomain(found) : null;
  },
  async createVideo(video: YoutubeVideo): Promise<YoutubeVideo> {
    const created = await prisma.youtubeVideo.create({
      data: {
        id: video.id,
        title: video.title,
        channelId: video.channelId,
        channelTitle: video.channelTitle,
        thumbnailUrl: video.thumbnailUrl,
        publishedAt: video.publishedAt,
      },
    });
    return youtubeVideoMapper.toDomain(created);
  },
};

export default youtubeRepo;
