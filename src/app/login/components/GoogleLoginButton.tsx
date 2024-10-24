"use client";
import { fetchGenerateOauthUrl } from "@/app/api/auth/oauth-url/fetch";
import { PAGE_ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
	const router = useRouter();

	const handleClick = async () => {
		console.log("GoogleLoginButton handleClick");
		try {
			const { oauthUrl } = await fetchGenerateOauthUrl();
			location.href = oauthUrl;
		} catch {
			router.push(PAGE_ROUTES.error.auth);
		}
	};

	return (
		<button className="" onClick={handleClick}>
			Google 로그인
		</button>
	);
}
