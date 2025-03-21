"use client";
import Link from "next/link";
import { fetchLgout } from "../api/auth/logout/fetch";
import { useAuth } from "./AuthProvider";
import { PageRoutes } from "@/constants/routes";

interface Props {
	className?: string;
}

export default function Header({ className }: Props) {
	const { isAuthenticated, logout } = useAuth();

	const handleLogoutClick = async () => {
		await fetchLgout();
		logout();
	};

	/* TODO: color theme */
	return (
		<header
			className={`flex justify-between items-center py-4 h-full ${className}`}
		>
			<Link className="font-bold text-black text-2xl" href={PageRoutes.HOME}>
				Anti Fake
			</Link>

			{isAuthenticated && (
				<button
					className="font-normal text-[#4B5563] text-base"
					onClick={handleLogoutClick}
				>
					로그아웃
				</button>
			)}
		</header>
	);
}
