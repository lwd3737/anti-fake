"use client";
import { isFailure } from "@/result";
import { fetchGenerateAccessToken } from "../api/auth/generate-token/fetch";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { PAGE_ROUTES } from "@/constants/routes";
import { useEffect } from "react";

export default function OauthCallbackPage() {
	const params = useSearchParams();
	const router = useRouter();

	useEffect(
		function () {
			const [state, code] = [params.get("state"), params.get("code")];
			if (!state || !code) return redirect(PAGE_ROUTES.error.auth);

			fetchGenerateAccessToken({
				state,
				authCode: code,
			}).then((result) => {
				if (isFailure(result)) router.push(PAGE_ROUTES.error.auth);

				router.push("/");
			});
		},
		[params, router],
	);

	return (
		<main>
			<h1>로그인 중...</h1>
		</main>
	);
}
