import { DetailsHTMLAttributes, ReactNode } from "react";

interface Props extends DetailsHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: Props) {
	return (
		<button
			className={`px-6 py-3 rounded-lg font-medium ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
