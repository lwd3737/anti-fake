import { NextRequest, NextResponse } from 'next/server';
import { GenerateOauthUrlResponseDto } from '@/gateway/dto/auth';
import { authService } from '@/services';
import { generateCsrfToken } from '@/utils/csrf';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { ErrorCode } from '@/gateway/error/error-code';
import { Result } from '@/result';

export const runtime = 'nodejs';

export async function POST(
  req: NextRequest,
): Promise<
  NextResponse<Result<GenerateOauthUrlResponseDto, ErrorCode.UNAUTHENTICATED>>
> {
  const csrfToken = generateCsrfToken();
  try {
    const oauthUrl = authService.generateAuthUrl(csrfToken);
    return NextResponse.json(
      { oauthUrl },
      {
        headers: {
          'x-csrf-token': csrfToken,
        },
      },
    );
  } catch (error) {
    return handleRouteError(
      ErrorCode.UNAUTHENTICATED,
      'oauthUrl generation failed',
    );
  }
}
