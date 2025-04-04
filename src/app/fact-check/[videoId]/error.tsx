"use client";

import { PageRoutes } from "@/constants/routes";
import { useRouter } from "next/navigation";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	const router = useRouter();

	return (
		<div className="flex flex-col justify-center items-center gap-y-8 h-full">
			<h1 className="font-bold text-2xl">Factcheck Error</h1>
			<p>{error.message}</p>

			<div className="flex gap-x-4">
				<button
					className="bg-blue-500 px-4 py-2 rounded text-white"
					onClick={() => reset()}
				>
					재시도
				</button>
			</div>
			<button onClick={() => router.replace(PageRoutes.LOGIN)}>로그인</button>
		</div>
	);
}
