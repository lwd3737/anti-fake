import FactCheckList from "./components/FactCheckList";
import ControlHorizontalBar from "./components/ControlHorizontalBar";

export default function FactCheckPage() {
	return (
		<section className="flex flex-col gap-y-10 py-5">
			<FactCheckList />
			<ControlHorizontalBar />
		</section>
	);
}
