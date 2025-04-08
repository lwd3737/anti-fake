"use client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { PageRoutes } from "@/constants/routes";
import { useEffect } from "react";
import { useAuth } from "../../(protected)/components/AuthProvider";
import { fetchGenerateAccessToken } from "../../api/auth/generate-token/fetch";
import { isFailure } from "@/result";
import Logo from "@/components/Logo";
import Image from "next/image";

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
		<main className="flex flex-col justify-center items-center gap-y-12 p-14 h-full">
			<div className="flex flex-col items-center">
				<Image
					className="animate-spin"
					src="/icons/loading.svg"
					alt="loading"
					width={64}
					height={64}
				/>
				<h1 className="mt-8 mb-2 font-medium text-2xl">로그인 중입니다</h1>
				<p className="text-[#6B7280]">잠시만 기다려 주세요...</p>
			</div>
		</main>
	);
}
