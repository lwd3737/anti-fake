import { APIRoutes } from "@/constants/routes";
import { GenerateOauthUrlResponseDto } from "@/dto/auth";

export async function fetchGenerateOauthUrl(): Promise<GenerateOauthUrlResponseDto> {
	const res = await fetch(APIRoutes.auth.OAUTH_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}
