import FactCheckList from "./components/FactCheckList";
import ControlHorizontalBar from "./components/ControlHorizontalBar";
import YoutubeVideoInfoCard from "./components/YoutubeVideoInfoCard/YoutubeVideoInfoCard";

export default function FactCheckPage({
	params: { videoId },
}: {
	params: { videoId: string };
}) {
	// TODO: card 공통 컴포넌트 추출
	return (
		<div className="flex flex-col h-full">
			<main className="flex flex-col flex-[1_1_0px] gap-y-8 mb-16 py-8 overflow-y-auto">
				<YoutubeVideoInfoCard className="mx-12" videoId={videoId} />
				<FactCheckList className="mx-12" />
			</main>

			<footer className="right-0 bottom-0 left-0 z-200 fixed h-16">
				<ControlHorizontalBar />
			</footer>
		</div>
	);
}
