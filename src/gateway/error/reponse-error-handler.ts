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

export const handleRouteError = <Code extends ErrorCode>(
  code: ErrorCode,
  message: string,
  status = 500,
  context?: Record<string, any>,
): NextResponse<Failure<Code>> => {
  return NextResponse.json(
    {
      code,
      message,
      context,
    },
    { status },
  ) as NextResponse<Failure<Code>>;
};
