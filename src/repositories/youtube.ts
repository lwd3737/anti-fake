import { youtubeVideoMapper } from '@/mappers/youtube';
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

  async createVideo(
    video: Omit<YoutubeVideo, 'transcript' | 'transcriptSummary'>,
  ): Promise<YoutubeVideo> {
    const created = await prisma.youtubeVideo.create({
      data: video,
    });
    return youtubeVideoMapper.fromPersistence(created);
  },

  async upsertVideo(
    video: Omit<YoutubeVideo, 'transcript' | 'transcriptSummary'>,
  ): Promise<YoutubeVideo> {
    const upserted = await prisma.youtubeVideo.upsert({
      where: { id: video.id },
      update: {
        title: video.title,
        channelId: video.channelId,
        channelTitle: video.channelTitle,
        thumbnailUrl: video.thumbnailUrl,
        publishedAt: video.publishedAt,
      },
      create: video,
    });
    return youtubeVideoMapper.fromPersistence(upserted);
  },

  async updateVideo(
    id: string,
    data: Partial<Omit<YoutubeVideo, 'id'>>,
  ): Promise<YoutubeVideo> {
    const {
      title,
      channelId,
      channelTitle,
      thumbnailUrl,
      transcript,
      summary,
      publishedAt,
    } = data;
    const updated = await prisma.youtubeVideo.update({
      where: { id },
      data: {
        title,
        channelId,
        channelTitle,
        thumbnailUrl,
        publishedAt,
        transcript: transcript?.text,
        transcriptMetadata: transcript
          ? {
              segments: transcript?.segments,
              duration: transcript?.duration,
            }
          : undefined,
        transcriptSummary: summary,
      },
    });
    return youtubeVideoMapper.fromPersistence(updated);
  },

  async updateTranscript(
    videoId: string,
    {
      transcript,
      transcriptSummary,
    }: {
      transcript: YoutubeVideoTranscript;
      transcriptSummary: string;
    },
  ): Promise<YoutubeVideo> {
    const updated = await prisma.youtubeVideo.update({
      where: { id: videoId },
      data: {
        transcript: transcript.text,
        transcriptMetadata: {
          segments: transcript.segments,
          duration: transcript.duration,
        },
        transcriptSummary,
      },
    });
    return youtubeVideoMapper.fromPersistence(updated);
  },
};

export default youtubeRepo;
