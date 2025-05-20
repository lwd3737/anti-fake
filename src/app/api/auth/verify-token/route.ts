import { VerifyTokenRequestDto, VerifyTokenResponseDto } from '@/dto/auth';
import { authService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
): Promise<NextResponse<VerifyTokenResponseDto>> {
  try {
    const { accessToken } = (await req.json()) as VerifyTokenRequestDto;

    const [isVerified, { providerSub }] =
      await authService.verifyAccessToken(accessToken);

    if (!isVerified) {
      try {
        const newAccessToken = await authService.refresh(providerSub);
        const res = NextResponse.json({
          isVerified: true,
          providerSub,
        });
        res.cookies.set('access-token', newAccessToken);
        return res;
      } catch (e) {
        console.error('Failed to refresh access token:', e);
        return NextResponse.json({ isVerified: false }, { status: 401 });
      }
    }

    return NextResponse.json({
      isVerified: true,
      providerSub,
    });
  } catch (e) {
    console.error('Token verification failed:', e);
    return NextResponse.json({ isVerified: false }, { status: 401 });
  }
}
