"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Home() {
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const videoUrl = data.get("videoUrl");

		router.push(`/fact-check?videoUrl=${videoUrl}`);
	};

	return (
		<main className="h-full">
			<form onSubmit={handleSubmit}>
				<input
					className="w-full px-5 py-3 bg-gray-100 border border-gray-300 border-solid rounded-md border-1"
					type="text"
					name="videoUrl"
					placeholder="Youtube video URL"
				/>

				<div className="flex justify-end mt-4">
					<button className="p-3 text-white bg-blue-500 rounded-lg">
						팩트체크 시작
					</button>
				</div>
			</form>
		</main>
	);
}
