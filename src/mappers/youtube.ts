import { YoutubeVideo } from '@/models/youtube';
import { YoutubeVideo as PrismaYoutubeVideo } from '/prisma/generated/prisma';
import { YoutubeVideoDto } from '@/gateway/dto/youttube';

const youtubeVideoMapper = {
  fromPersistence(record: PrismaYoutubeVideo): YoutubeVideo {
    return {
      id: record.id,
      title: record.title,
      channelId: record.channelId,
      channelTitle: record.channelTitle,
      thumbnailUrl: record.thumbnailUrl,
      publishedAt: record.publishedAt,
    };
  },

  fromDto(dto: YoutubeVideoDto): YoutubeVideo {
    return {
      id: dto.id,
      title: dto.title,
      channelId: dto.channelId,
      channelTitle: dto.channelTitle,
      thumbnailUrl: dto.thumbnail.url,
      publishedAt: new Date(dto.publishedAt),
    };
  },
};

export default youtubeVideoMapper;
