import { APIRoutes } from "@/constants/routes";
import { VerifyTokenResponseDto } from "@/dto/auth";
import { generateServerUrl } from "@/utils/url";

export async function fetchVerifyAccessToken(
	accessToken: string,
): Promise<VerifyTokenResponseDto> {
	const res = await fetch(generateServerUrl(APIRoutes.auth.VERIFY_TOKEN), {
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
