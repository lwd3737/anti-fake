import { youtubeVideoMapper } from '@/mappers/youtube';
import prisma from './prisma';
import { YoutubeVideo } from '@/models/youtube';

const youtubeRepo = {
  async findVideos(ids: string[]): Promise<YoutubeVideo[]> {
    const found = await prisma.youtubeVideo.findMany({
      where: {
        id: { in: ids },
      },
    });
    return found.map(youtubeVideoMapper.fromPersistence);
  },

  async findVideoById(id: string): Promise<Required<YoutubeVideo> | null> {
    const found = await prisma.youtubeVideo.findUnique({
      where: {
        id,
      },
    });
    return found ? youtubeVideoMapper.fromPersistence(found) : null;
  },

  async createVideo(video: Required<YoutubeVideo>): Promise<YoutubeVideo> {
    const { transcript, transcriptSummary, ...rest } = video;
    const created = await prisma.youtubeVideo.create({
      data: {
        ...rest,
        transcriptMetadata: {
          duration: transcript.duration,
          segments: transcript.segments,
        },
        transcript: transcript.text,
        transcriptSummary,
      },
    });
    return youtubeVideoMapper.fromPersistence(created);
  },
};

export default youtubeRepo;
