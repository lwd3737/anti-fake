import loadConfig from "@/config";
import GoogleAuth from "@/services/googgle-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GoogleLoginButton from "./components/GoogleLoginButton";

export default function LoginPage() {
	// const redirectGoogleAuth = async () => {
	// 	"use server";
	// 	const config = loadConfig();

	// 	const googgleAuth = GoogleAuth.create();
	// 	const authUrl = googgleAuth.generateAuthUrlWithYoutubeScope();

	// 	cookies().set({
	// 		name: "csrf-token",
	// 		value: googgleAuth.csrfToken!,
	// 		secure: config.nodeEnv === "production",
	// 		sameSite: "strict",
	// 		httpOnly: true,
	// 	});

	// 	console.log("authUrl", authUrl);
	// 	redirect(authUrl);
	// };

	return (
		<main>
			<GoogleLoginButton />
		</main>
	);
}
