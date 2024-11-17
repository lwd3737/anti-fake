import { Failure } from "./error/reponse-error-handler";

export type Result<T = any> = T | Failure;

export function isFailure(result: Record<string, any>): result is Failure {
	return "code" in result && "error" in result;
}
