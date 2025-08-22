import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const authGuardResult = await guardRouteHandler();
  if (!authGuardResult.isAuthenticated) return authGuardResult.redirect();

  const res = new NextResponse();
  res.cookies.delete('access-token');
  res.cookies.delete('csrf-token');
  return res;
}
