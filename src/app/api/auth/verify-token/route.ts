import { VerifyTokenRequestDto, VerifyTokenResponseDto } from "@/dto/auth";
import GoogleAuth from "@/service/google-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
): Promise<NextResponse<VerifyTokenResponseDto>> {
	const { accessToken } = (await req.json()) as VerifyTokenRequestDto;

	const auth = GoogleAuth.create();
	const isVerified = await auth.verifyAccessToken(accessToken);

	return NextResponse.json({ isVerified });
}
