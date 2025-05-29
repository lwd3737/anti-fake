import { NextRequest, NextResponse } from 'next/server';
import { GenerateOauthUrlResponseDto } from '@/gateway/dto/auth';
import { authService } from '@/services';
import { generateCsrfToken } from '@/utils/csrf';

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenerateOauthUrlResponseDto>> {
  const csrfToken = generateCsrfToken();
  console.log('generate oauth url', authService.generateAuthUrl);
  const oauthUrl = authService.generateAuthUrl(csrfToken);

  return NextResponse.json(
    { oauthUrl },
    {
      headers: {
        'x-csrf-token': csrfToken,
      },
    },
  );
}
