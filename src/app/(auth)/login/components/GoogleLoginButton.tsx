"use client";
import { fetchGenerateOauthUrl } from "@/app/api/auth/oauth-url/fetch";
import { PageRoutes } from "@/constants/routes";
import Image from "next/image";
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
			<Image
				src="/icons/google-login-button.svg"
				alt="google login"
				width={330}
				height={50}
			/>
		</button>
	);
}
