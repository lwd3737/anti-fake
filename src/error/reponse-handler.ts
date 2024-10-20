import { NextResponse } from "next/server";

export const handleError = (code: string, message: string, status = 500) => {
	return NextResponse.json(
		{
			code,
			error: message,
		},
		{ status },
	);
};
