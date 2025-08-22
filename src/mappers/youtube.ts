import { YoutubeVideo, YoutubeVideoTranscript } from '@/models/youtube';
import { YoutubeVideo as PrismaYoutubeVideo } from '@prisma/client';
import { YoutubeVideoDto } from '@/gateway/dto/youttube';

export const youtubeVideoMapper = {
  fromPersistence(record: PrismaYoutubeVideo): YoutubeVideo {
    const transcript = youtubeVideoTranscriptMapper.fromPersistence(record);
    return {
      id: record.id,
      title: record.title,
      channelId: record.channelId,
      channelTitle: record.channelTitle,
      thumbnailUrl: record.thumbnailUrl,
      transcript,
      summary: record.transcriptSummary,
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

export const youtubeVideoTranscriptMapper = {
  fromPersistence(record: PrismaYoutubeVideo): YoutubeVideoTranscript | null {
    if (!record.transcriptMetadata || !record.transcript) return null;

    const { duration, segments } = record.transcriptMetadata as unknown as {
      duration: number;
      segments: {
        start: number;
        end: number;
        text: string;
      }[];
    };
    return {
      text: record.transcript,
      duration,
      segments,
    };
  },
};
