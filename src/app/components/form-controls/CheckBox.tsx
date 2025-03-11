import { HTMLProps } from "react";

interface Props extends Omit<HTMLProps<HTMLInputElement>, "type" | "onChange"> {
	label?: string;
	onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({ label, ...props }: Props) {
	return (
		<span className="flex items-center gap-x-2">
			<input type="checkbox" {...props} />
			{label && <label>{label}</label>}
		</span>
	);
}
