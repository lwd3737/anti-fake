import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	to: string;
}

export default function NavLink({ children, to }: Props) {
	return (
		<Link
			className="text-[1.125rem] text-gray-700 hover:text-gray-900"
			href={to}
		>
			{children}
		</Link>
	);
}
