"use client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { PAGE_ROUTES } from "@/constants/routes";
import { useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { fetchGenerateAccessToken } from "../api/auth/generate-token/fetch";
import { isFailure } from "@/result";

export default function OauthCallbackPage() {
	const params = useSearchParams();
	const router = useRouter();

	const { login } = useAuth();

	useEffect(
		function gnerateTokenOnMount() {
			const [state, code] = [params.get("state"), params.get("code")];
			if (!state || !code) return redirect(PAGE_ROUTES.error.auth);

			const controller = new AbortController();

			fetchGenerateAccessToken(
				{
					state,
					authCode: code,
				},
				controller.signal,
			)
				.then((result) => {
					if (isFailure(result)) router.push(PAGE_ROUTES.error.auth);

					login();
				})
				.catch((e) => {
					const error = e as Error;
					if (error.name === "AbortError") {
						console.log(error.message);
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
