"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { PAGE_ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { fetchGenerateAccessToken } from "../api/auth/generate-token/fetch";
import { isFailure } from "@/result";

export const AuthContext = createContext<{
	isAuthenticated: boolean;
	login?: () => void;
	logout?: () => void;
	generateToken?: (state: string, authCode: string) => void;
}>({ isAuthenticated: false });

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = useCallback(() => {
		setIsAuthenticated(true);
		router.replace("/");
	}, [router]);

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		router.push(PAGE_ROUTES.login);
	}, [router]);

	const generateToken = useCallback(
		async (state: string, authCode: string) => {
			const result = await fetchGenerateAccessToken({
				state,
				authCode,
			});
			if (isFailure(result)) router.push(PAGE_ROUTES.error.auth);
		},
		[login, router],
	);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				generateToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const { isAuthenticated, login, logout, generateToken } =
		useContext(AuthContext);

	if (!login || !logout || !generateToken) {
		throw new Error("AuthProvider를 사용하지 않았습니다.");
	}

	return {
		isAuthenticated,
		login,
		logout,
		generateToken,
	};
}
