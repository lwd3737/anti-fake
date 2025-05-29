import { CookieNames } from '@/constants/cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json();
  cookies().set(CookieNames.ACCESS_TOKEN, accessToken);
  return NextResponse.json({ ok: true });
}
