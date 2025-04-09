import Logo from "@/components/Logo";
import GoogleLoginButton from "./components/GoogleLoginButton";

export default function LoginPage() {
	return (
		<main className="flex flex-col justify-center items-center gap-y-5 p-14 h-full">
			<div className="flex flex-col justify-between items-center bg-white shadow-md p-8 pt-8 pb-12 rounded-lg w-[30vw] h-[60vh]">
				<div className="text-center">
					<div className="mb-12">
						<Logo />
					</div>
					<h1 className="mb-2 font-bold text-[#111827] text-[1.875rem]">
						시작하기
					</h1>
					<p className="text-[#6B7280]">계정에 로그인하세요</p>
				</div>

				<GoogleLoginButton />
			</div>
		</main>
	);
}
