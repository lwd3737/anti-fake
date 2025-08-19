import apiClient from '@/app/api/client';
import { APIRoutes } from '@/constants/routes';
import { Result } from '@/result';

export async function deleteClaim(
  factCheckSessionId: string,
  claimId: string,
): Promise<Result<void>> {
  const res = await apiClient(
    APIRoutes.factCheckSessions.claim(factCheckSessionId, claimId),
    {
      method: 'DELETE',
    },
  );
  return await res.json();
}
