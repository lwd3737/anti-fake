"use client";
import Link from "next/link";
import { fetchLgout } from "../../api/auth/logout/fetch";
import { useAuth } from "./AuthProvider";
import { PageRoutes } from "@/constants/routes";
import Logo from "@/components/Logo";

export default function Header() {
	const { isAuthenticated, logout } = useAuth();

	const handleLogoutClick = async () => {
		await fetchLgout();
		logout();
	};

	/* TODO: theme 적용*/
	return (
		<header
			className={`px-8 bg-white shadow-sm flex justify-between items-center py-4 h-full`}
		>
			<Logo />

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
