import FactCheckList from "./components/FactCheckList";
import ControlHorizontalBar from "./components/ControlHorizontalBar";
import YoutubeVideoInfoCard from "./components/YoutubeVideoInfoCard";

export default function FactCheckPage({
	params: { videoId },
}: {
	params: { videoId: string };
}) {
	return (
		<div className="flex flex-col h-full">
			<main className="flex-[1_1_0px] mb-16 overflow-y-auto">
				<YoutubeVideoInfoCard videoId={videoId} />
				<FactCheckList />
			</main>

			<footer className="right-0 bottom-0 left-0 z-200 fixed h-16">
				<ControlHorizontalBar />
			</footer>
		</div>
	);
}
