import { YoutubeVideo } from '@/models/youtube';

const youtubeVideoMapper = {
  toDomain(record: YoutubeVideo): YoutubeVideo {
    return {
      id: record.id,
      title: record.title,
      channelId: record.channelId,
      channelTitle: record.channelTitle,
      thumbnailUrl: record.thumbnailUrl,
      publishedAt: record.publishedAt,
    };
  },
};

export default youtubeVideoMapper;
