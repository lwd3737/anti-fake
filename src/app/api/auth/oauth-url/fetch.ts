import { API_ROUTES } from "@/constants/routes";
import { GenerateOauthUrlDto } from "@/dto/auth";

export async function fetchGenerateOauthUrl(): Promise<GenerateOauthUrlDto> {
	const res = await fetch(API_ROUTES.auth.oauthUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) throw new Error("Failed to generate oauth url");

	return await res.json();
}
