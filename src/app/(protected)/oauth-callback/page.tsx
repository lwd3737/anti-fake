"use client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { PageRoutes } from "@/constants/routes";
import { useEffect } from "react";
import { useAuth } from "../../(protected)/components/AuthProvider";
import { fetchGenerateAccessToken } from "../../api/auth/generate-token/fetch";
import { isFailure } from "@/result";

export default function OauthCallbackPage() {
	const params = useSearchParams();
	const router = useRouter();

	const { login } = useAuth();

	useEffect(
		function gnerateTokenOnMount() {
			const [state, code] = [params.get("state"), params.get("code")];
			if (!state || !code) return redirect(PageRoutes.error.AUTH);

			const controller = new AbortController();

			fetchGenerateAccessToken(
				{
					state,
					authCode: code,
				},
				controller.signal,
			)
				.then((result) => {
					if (isFailure(result)) router.push(PageRoutes.error.AUTH);

					login();
				})
				.catch((e) => {
					const error = e as Error;
					if (error.name === "AbortError") {
						return;
					}

					console.error(error);
				});

			return () => controller.abort();
		},
		[login, params, router],
	);

	return (
		<main>
			<h1>로그인 중...</h1>
		</main>
	);
}
