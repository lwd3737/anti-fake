import loadConfig from '@/config';
import { APIRoutes } from '@/constants/routes';
import { VideoDto } from '@/gateway/dto/youttube';
import { Result } from '@/result';

// TODO: base api 구현
export const getVideo = async (videoId: string): Promise<Result<VideoDto>> => {
  const res = await fetch(
    `${loadConfig().baseUrl}${APIRoutes.youtube.video(videoId)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return await res.json();
};
