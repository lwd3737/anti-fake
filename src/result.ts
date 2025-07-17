import { Failure } from './gateway/error/reponse-error-handler';

export type Result<T = any> = T | Failure;

export function isFailure(result: any): result is Failure {
  if (typeof result === 'object' && result !== null)
    return 'code' in result && 'message' in result;
  return false;
}
