import { ErrorCode } from '@/gateway/error/error-code';
import { FactCheckSession } from '@/models/fact-check-session';
import factCheckSessionRepo from '@/repositories/fact-check-session';
import { Result } from '@/result';

export default class FactCheckSessionService {
  public async findById({
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

  public async findAllByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Result<FactCheckSession[]>> {
    try {
      const factCheckSessions =
        await factCheckSessionRepo.findAllByUserId(userId);
      return factCheckSessions;
    } catch (error) {
      return {
        code: ErrorCode.FACT_CHECK_SESSIONS_READ_FAILED,
        message: 'Failed to read fact check sessions',
      };
    }
  }
}
