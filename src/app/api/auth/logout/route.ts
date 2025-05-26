import { authGuard } from '@/gateway/auth/guard';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authGuardResult = await authGuard(req);
  if (!authGuardResult.isAuthenticated) return authGuardResult.response;

  const res = new NextResponse();
  res.cookies.delete('access-token');
  res.cookies.delete('csrf-token');
  return res;
}
