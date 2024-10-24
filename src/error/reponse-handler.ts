import { NextResponse } from "next/server";
import { ErrorCode } from "./code";

export interface Failure {
	code: ErrorCode;
	error: string;
}

export const handleRouteError = (
	code: ErrorCode,
	message: string,
	status = 500,
): NextResponse<Failure> => {
	return NextResponse.json(
		{
			code,
			error: message,
		},
		{ status },
	);
};
