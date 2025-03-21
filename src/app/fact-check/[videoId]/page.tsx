import FactCheckList from "./components/FactCheckList";
import ControlHorizontalBar from "./components/ControlHorizontalBar";

export default function FactCheckPage() {
	return (
		<div className="flex flex-col h-full">
			<div
				className={`px-12 py-8 h-[calc(100%-${Styles.header.height})] overflow-y-auto`}
			>
				<FactCheckList />
			</div>

			<div
				className={`right-0 bottom-0 left-0 fixed h-[${Styles.header.height}]`}
			>
				<ControlHorizontalBar />
			</div>
		</div>
	);
}

const Styles = {
	header: {
		height: "3rem",
	},
};
