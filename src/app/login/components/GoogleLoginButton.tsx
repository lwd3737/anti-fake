"use client";
import { fetchGenerateOauthUrl } from "@/app/api/auth/oauth-url/fetch";
import { PageRoutes } from "@/constants/routes";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
	const router = useRouter();

	const handleClick = async () => {
		try {
			const { oauthUrl } = await fetchGenerateOauthUrl();
			location.href = oauthUrl;
		} catch {
			router.push(PageRoutes.error.AUTH);
		}
	};

	return (
		<button className="" onClick={handleClick}>
			Google 로그인
		</button>
	);
}
