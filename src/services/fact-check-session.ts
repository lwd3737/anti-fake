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
  }): Promise<
    Result<
      FactCheckSession,
      ErrorCode.FACT_CHECK_SESSION_NOT_FOUND | ErrorCode.UNAUTHORIZATION
    >
  > {
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

      const videoIds = sessions.map((session) => session.contentId);
      const videos = await youtubeRepo.findVideos(videoIds);

      return sessions
        .map(({ id, contentId, createdAt, _count }, idx) => {
          const video = videos[idx];
          if (!video) {
            return null;
          }

          return {
            id,
            contentId,
            createdAt,
            video: videos[idx],
            claimCount: _count.claims,
            verificationCount: _count.claimVerifications,
          };
        })
        .filter((archive) => archive !== null);
    } catch (error) {
      return {
        code: ErrorCode.FACT_CHECK_SESSIONS_READ_FAILED,
        message: 'Failed to read fact check sessions',
      };
    }
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      await factCheckSessionRepo.delete(id);
    } catch (error) {
      return {
        code: ErrorCode.FACT_CHECK_SESSIONS_DELETE_FAILED,
        message: 'Failed to delete fact check session',
      };
    }
  }
}
