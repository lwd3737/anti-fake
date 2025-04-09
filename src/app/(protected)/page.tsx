"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Home() {
	const router = useRouter();

	// TODO: server action으로 바꾸기
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
		<main className="flex justify-center px-20 py-8 h-full">
			<div className="bg-white shadow-sm p-10 rounded-lg w-full h-full">
				<div className="flex flex-col gap-y-5 text-center">
					<h1 className="flex justify-center items-center gap-x-3 font-bold text-3xl">
						<Image
							src="/icons/youtube-logo.svg"
							alt="youtube logo"
							width={32}
							height={32}
						/>
						<span>유튜브 비디오 팩트체크</span>
					</h1>
					<p className="text-[#6B7280]">
						유튜브 비디오 링크를 입력하면, 영상의 사실 여부를 알려드립니다.
					</p>
				</div>

				<form className="flex flex-col gap-y-10 py-8" onSubmit={handleSubmit}>
					<input
						className="bg-gray-50 px-5 py-6 border border-1 border-gray-300 border-solid rounded-md w-full"
						type="text"
						name="videoUrl"
						placeholder="https://www.youtube.com/watch?v=..."
					/>

					<button className="flex justify-center items-center gap-x-2 bg-brand p-5 rounded-lg w-full font-semibold text-[1.125rem] text-white">
						<Image
							src="/icons/search.svg"
							alt="start fectcheck"
							width={18}
							height={18}
						/>
						<span>팩트체크 시작하기</span>
					</button>
				</form>
			</div>
		</main>
	);
}
