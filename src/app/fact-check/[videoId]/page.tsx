import FactCheckList from "./components/FactCheckList";
import ControlHorizontalBar from "./components/ControlHorizontalBar";

export default function FactCheckPage() {
	return (
		<div className="flex flex-col h-full">
			<section className="flex-[1_1_0px] mb-12 overflow-y-auto">
				<FactCheckList />
			</section>

			<footer className="right-0 bottom-0 left-0 z-200 fixed h-12">
				<ControlHorizontalBar />
			</footer>
		</div>
	);
}
