import { APIRoutes } from "@/constants/routes";

export async function fetchLgout(): Promise<Response> {
	return await fetch(APIRoutes.auth.LOGOUT, {
		method: "POST",
	});
}
