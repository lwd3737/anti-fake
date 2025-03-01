"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Home() {
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const videoUrl = data.get("videoUrl");
		if (!videoUrl) return;

		const url = new URL(videoUrl as string);
		if (
			(url.host !== "www.youtube.com" || url.pathname !== "/watch",
			!url.searchParams.get("v"))
		) {
			alert("유튜브 URL 형식이 아닙니다. 다시 입력해주세요.");
			return;
		}

		const videoId = url.searchParams.get("v");

		router.push(`/fact-check/${videoId}`);
	};

	return (
		<main className="h-full">
			<form onSubmit={handleSubmit}>
				<input
					className="bg-gray-100 px-5 py-3 border border-1 border-gray-300 border-solid rounded-md w-full"
					type="text"
					name="videoUrl"
					placeholder="Youtube video URL"
				/>

				<div className="flex justify-end mt-4">
					<button className="bg-blue-500 p-3 rounded-lg text-white">
						팩트체크 시작
					</button>
				</div>
			</form>
		</main>
	);
}
