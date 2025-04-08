import Logo from "@/components/Logo";
import GoogleLoginButton from "./components/GoogleLoginButton";

export default function LoginPage() {
	return (
		<main className="flex flex-col items-center gap-y-5 p-14 h-full">
			<Logo />

			<div className="flex flex-col items-center gap-y-8 bg-white shadow-sm p-8 rounded-lg w-[30vw] h-[60vh]">
				<h1 className="font-bold text-2xl">로그인</h1>
				<GoogleLoginButton />
			</div>
		</main>
	);
}
