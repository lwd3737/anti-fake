import { API_ROUTES } from "@/constants/routes";
import { GenerateTokenRequestDto, GenerateTokenResponseDto } from "@/dto/auth";
import { Result } from "@/result";
import { generateServerUrl } from "@/utils/url";

export async function fetchGenerateAccessToken(
	input: GenerateTokenRequestDto,
): Promise<Result<GenerateTokenResponseDto>> {
	const res = await fetch(API_ROUTES.auth.generateToken, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	});
	return await res.json();
}
