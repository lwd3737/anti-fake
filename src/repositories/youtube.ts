import youtubeVideoMapper from '@/mappers/youtube';
import prisma from './prisma';
import { YoutubeVideo, YoutubeVideoTranscript } from '@/models/youtube';

const youtubeRepo = {
  async findVideos(ids: string[]): Promise<YoutubeVideo[]> {
    const found = await prisma.youtubeVideo.findMany({
      where: {
        id: { in: ids },
      },
    });
    return found.map(youtubeVideoMapper.fromPersistence);
  },

  async findVideoById(id: string): Promise<YoutubeVideo | null> {
    const found = await prisma.youtubeVideo.findUnique({
      where: {
        id,
      },
    });

    return found ? youtubeVideoMapper.fromPersistence(found) : null;
  },

  async createVideo({
    id,
    title,
    channelId,
    channelTitle,
    thumbnailUrl,
    publishedAt,
  }: YoutubeVideo): Promise<YoutubeVideo> {
    const created = await prisma.youtubeVideo.create({
      data: {
        id,
        title,
        channelId,
        channelTitle,
        thumbnailUrl,
        publishedAt,
      },
    });
    return youtubeVideoMapper.fromPersistence(created);
  },

  async updateTranscript(
    videoId: string,
    transcript: YoutubeVideoTranscript,
  ): Promise<void> {
    await prisma.youtubeVideo.update({
      where: { id: videoId },
      data: {
        transcript: transcript.text,
        transcriptMetadata: {
          duration: transcript.duration,
          segments: transcript.segments,
        },
      },
    });
  },

  async updateTranscriptSummary(
    videoId: string,
    summary: string,
  ): Promise<void> {
    await prisma.youtubeVideo.update({
      where: { id: videoId },
      data: {
        transcriptSummary: summary,
      },
    });
  },
};

export default youtubeRepo;
