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
  async getVideo(id: string) {
    const found = await prisma.youtubeVideo.findUnique({
      where: {
        id,
      },
    });

    return found ? youtubeVideoMapper.toDomain(found) : null;
  },
  async createVideo(video: YoutubeVideo) {
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
