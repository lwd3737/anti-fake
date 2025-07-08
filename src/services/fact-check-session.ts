import { ErrorCode } from '@/gateway/error/error-code';
import { FactCheckSession } from '@/models/fact-check-session';
import { YoutubeVideo } from '@/models/youtube';
import factCheckSessionRepo from '@/repositories/fact-check-session';
import prisma from '@/repositories/prisma';
import youtubeRepo from '@/repositories/youtube';
import { Result } from '@/result';

export default class FactCheckSessionService {
  public async getOwn({
    factCheckSessionId,
    userId,
  }: {
    factCheckSessionId: string;
    userId: string;
  }): Promise<Result<FactCheckSession>> {
    const factCheckSession =
      await factCheckSessionRepo.findById(factCheckSessionId);
    if (!factCheckSession) {
      return {
        code: ErrorCode.FACT_CHECK_SESSION_NOT_FOUND,
        message: 'Fact check session not found',
      };
    }

    if (factCheckSession.userId !== userId) {
      return {
        code: ErrorCode.UNAUTHORIZATION,
        message: "User is not factcheck session's owner",
      };
    }

    return factCheckSession;
  }

  public async getArchive({ userId }: { userId: string }): Promise<
    Result<
      (Pick<FactCheckSession, 'id' | 'createdAt'> & {
        video: YoutubeVideo;
        claimCount: number;
        verificationCount: number;
      })[]
    >
  > {
    try {
      const sessions = await prisma.factCheckSession.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          contentId: true,
          createdAt: true,
          _count: {
            select: {
              claims: true,
              claimVerifications: true,
            },
          },
        },
      });

      const videoIds = sessions.map(({ contentId }) => contentId);
      const videos = await youtubeRepo.getVideos(videoIds);

      return sessions.map(({ id, contentId, createdAt, _count }, idx) => ({
        id,
        contentId,
        createdAt,
        video: videos[idx],
        claimCount: _count.claims,
        verificationCount: _count.claimVerifications,
      }));
    } catch (error) {
      return {
        code: ErrorCode.FACT_CHECK_SESSIONS_READ_FAILED,
        message: 'Failed to read fact check sessions',
      };
    }
  }
}
