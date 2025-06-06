import { ErrorCode } from '@/gateway/error/error-code';
import { FactCheckSession } from '@/models/fact-check-session';
import factCheckSessionRepo from '@/repositories/fact-check-session';
import { Result } from '@/result';

export default class FactCheckSessionService {
  public async authoirze({
    factCheckSessionId,
    ownerId,
  }: {
    factCheckSessionId: string;
    ownerId: string;
  }): Promise<Result<FactCheckSession>> {
    const factCheckSession =
      await factCheckSessionRepo.findById(factCheckSessionId);
    if (!factCheckSession) {
      return {
        code: ErrorCode.FACT_CHECK_SESSION_NOT_FOUND,
        error: 'Fact check session not found',
      };
    }

    if (factCheckSession.userId !== ownerId) {
      return {
        code: ErrorCode.UNAUTHORIZATION,
        error: "User is not factcheck session's owner",
      };
    }

    return factCheckSession;
  }
}
