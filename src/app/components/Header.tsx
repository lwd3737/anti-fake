"use client";
import { fetchLgout } from "../api/auth/logout/fetch";
import { useAuth } from "./AuthProvider";

export default function Header() {
	const { isAuthenticated, logout } = useAuth();

	const handleLogoutClick = async () => {
		await fetchLgout();
		logout();
	};

	/* TODO: color theme */
	return (
		<header className="flex justify-between items-center py-4 h-16">
			<h1 className="font-bold text-black text-2xl">Anti Fake</h1>
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
