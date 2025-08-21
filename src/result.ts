import { ErrorCode } from './gateway/error/error-code';
import { Failure } from './gateway/error/reponse-error-handler';

export type Result<
  T = any,
  Code extends ErrorCode = ErrorCode,
  Context = Record<string, any>,
> = T | Failure<Code, Context>;

export function isFailure(result: any): result is Failure {
  if (typeof result === 'object' && result !== null)
    return 'code' in result && 'message' in result;
  return false;
}
