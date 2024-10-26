import { API_ROUTES } from "@/constants/routes";
import { GenerateTokenRequestDto, GenerateTokenResponseDto } from "@/dto/auth";
import { Result } from "@/result";

export async function fetchGenerateAccessToken(
	input: GenerateTokenRequestDto,
	signal?: AbortSignal,
): Promise<Result<GenerateTokenResponseDto>> {
	const res = await fetch(API_ROUTES.auth.generateToken, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
		signal,
	});
	return await res.json();
}
