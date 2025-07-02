import apiClient from '@/app/api/client';
import { APIRoutes } from '@/constants/routes';
import { GetClaimVerificationsResponseDto } from '@/gateway/dto/claim-verification';
import { Result } from '@/result';

export async function getClaimVerifications(
  factCheckSessionId: string,
): Promise<Result<GetClaimVerificationsResponseDto>> {
  const res = await apiClient(
    APIRoutes.factCheckSessions.CLAIM_VERIFICATIONS(factCheckSessionId),
  );
  return await res.json();
}
