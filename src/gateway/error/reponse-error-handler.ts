import { NextResponse } from 'next/server';
import { ErrorCode } from './error-code';

export interface Failure<
  Code extends ErrorCode = ErrorCode,
  Context = Record<string, any>,
> {
  code: Code;
  message: string;
  context?: Context;
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
