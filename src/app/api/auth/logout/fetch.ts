import { API_ROUTES } from "@/constants/routes";

export async function fetchLgout(): Promise<Response> {
	return await fetch(API_ROUTES.auth.logout, {
		method: "POST",
	});
}
