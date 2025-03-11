import ClaimDetectionResultList from "./components/ClaimDetectionResultList";
import ControlHorizontalBar from "./components/ControlHorizontalBar";

export default function FactCheckPage() {
	return (
		<section className="flex flex-col gap-y-10 py-5">
			<ClaimDetectionResultList />
			<ControlHorizontalBar />
		</section>
	);
}
