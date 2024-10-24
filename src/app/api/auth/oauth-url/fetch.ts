import { API_ROUTES } from "@/constants/routes";
import { GenerateOauthUrlResponseDto } from "@/dto/auth";

export async function fetchGenerateOauthUrl(): Promise<GenerateOauthUrlResponseDto> {
	const res = await fetch(API_ROUTES.auth.oauthUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}
