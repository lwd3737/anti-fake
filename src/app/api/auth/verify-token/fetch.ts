import { API_ROUTES } from "@/constants/routes";
import { VerifyTokenResponseDto } from "@/dto/auth";
import { generateServerUrl } from "@/util/url";

export async function fetchVerifyAccessToken(
	accessToken: string,
): Promise<VerifyTokenResponseDto> {
	const res = await fetch(generateServerUrl(API_ROUTES.auth.verifyToken), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ accessToken }),
	});

	if (!res.ok) {
		throw new Error("Failed to verify access token");
	}

	return await res.json();
}
