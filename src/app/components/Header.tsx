"use client";
import { fetchLgout } from "../api/auth/logout/fetch";
import { useAuth } from "./AuthProvider";

export default function Header() {
	const { isAuthenticated, logout } = useAuth();

	const handleLogout = async () => {
		await fetchLgout();
		logout();
	};

	return (
		<header className="flex items-center justify-between py-4">
			<h1 className="text-2xl italic font-bold text-red-800">Anti Fake</h1>
			{isAuthenticated && <button onClick={handleLogout}>로그아웃</button>}
		</header>
	);
}
