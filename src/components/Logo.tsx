import { PageRoutes } from "@/constants/routes";
import Link from "next/link";

interface Props {
	onClick?: () => void;
}

export default function Logo({ onClick }: Props) {
	return (
		<Link
			className="font-bold text-brand text-2xl"
			href={PageRoutes.HOME}
			onClick={onClick}
		>
			Anti Fake
		</Link>
	);
}
