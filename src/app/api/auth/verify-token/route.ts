import { VerifyTokenRequestDto, VerifyTokenResponseDto } from '@/dto/auth';
import { authService } from '@/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
): Promise<NextResponse<VerifyTokenResponseDto>> {
  const { accessToken } = (await req.json()) as VerifyTokenRequestDto;

  const [isVerified, userInfo] =
    await authService.verifyAccessToken(accessToken);

  if (!isVerified) {
    try {
      const accessToken = await authService.refresh(userInfo.sub);

      const res = NextResponse.json({ isVerified: true });
      res.cookies.set('access-token', accessToken);

      return res;
    } catch (e) {
      console.debug('failed to refresh access-token', e);
      return NextResponse.json({ isVerified: false }, { status: 401 });
    }
  }

  return NextResponse.json({ isVerified: true });
}
