import { NextResponse } from 'next/server';
import { ErrorCode } from './error-code';

export interface Failure {
  code: ErrorCode;
  message: string;
  context?: Record<string, any>;
}

export const handleRouteError = (
  code: ErrorCode,
  message: string,
  status = 500,
  context?: Record<string, any>,
): NextResponse<Failure> => {
  return NextResponse.json(
    {
      code,
      message,
      context,
    },
    { status },
  );
};
