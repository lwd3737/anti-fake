import { NextRequest, NextResponse } from 'next/server';
import { GenerateOauthUrlResponseDto } from '@/dto/auth';
import { authService } from '@/services';
import { generateCsrfToken } from '@/utils/csrf';

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenerateOauthUrlResponseDto>> {
  const csrfToken = generateCsrfToken();
  const oauthUrl = authService.generateAuthUrlWithScopes(csrfToken);

  return NextResponse.json(
    { oauthUrl },
    {
      headers: {
        'x-csrf-token': csrfToken,
      },
    },
  );
}
