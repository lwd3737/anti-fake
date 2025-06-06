import apiClient from '@/app/api/client';
import { APIRoutes } from '@/constants/routes';
import { GetClaimsResponseDto } from '@/gateway/dto/claim';
import { Result } from '@/result';

export async function getClaims(
  factCheckSessionId: string,
): Promise<Result<GetClaimsResponseDto>> {
  const res = await apiClient(
    APIRoutes.factCheckSessions.claims(factCheckSessionId),
  );
  return await res.json();
}
