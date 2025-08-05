import { APIRoutes } from '@/constants/routes';
import { GenerateTranscriptResponseDto } from '@/gateway/dto/youttube';
import apiClient from '../../client';

export async function generateTranscript(
  videoId: string,
): Promise<GenerateTranscriptResponseDto> {
  const res = await apiClient(APIRoutes.youtube.TRANSCRIPT, {
    method: 'POST',
    body: JSON.stringify({ videoId }),
  });
  return await res.json();
}
