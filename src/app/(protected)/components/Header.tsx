"use client";
import { fetchLgout } from "../../api/auth/logout/fetch";
import { useAuth } from "./AuthProvider";
import Logo from "@/components/Logo";
import { PageRoutes } from "@/constants/routes";
import NavLink from "./NavLink";

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
			<section className="flex items-center gap-12">
				<Logo />

				<div className="flex gap-4">
					<NavLink to={PageRoutes.HOME}>홈</NavLink>
					<NavLink to={PageRoutes.ARCHIVE}>아카이브</NavLink>
				</div>
			</section>

			{isAuthenticated && (
				<button
					className="font-normal text-text-subtle text-base"
					onClick={handleLogoutClick}
				>
					로그아웃
				</button>
			)}
		</header>
	);
}
