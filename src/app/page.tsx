export default function Home() {
	return (
		<main className="h-full">
			<form>
				<input
					className="w-full px-5 py-3 bg-gray-100 border border-gray-300 border-solid rounded-md border-1"
					type="text"
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
