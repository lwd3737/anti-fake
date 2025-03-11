"use client";
import { ClaimVerificationPayload } from "@/dto/fact-check";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

export interface IClaimVerification {
	data: ClaimVerificationPayload[];
	append: (data: ClaimVerificationPayload[]) => void;
}

const ClaimVerificationContext = createContext<IClaimVerification>({
	data: [],
	append: () => {},
});

export default function ClaimVerificationProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [data, setData] = useState<ClaimVerificationPayload[]>([]);

	const append = useCallback((data: ClaimVerificationPayload[]) => {
		setData((prev) => [...prev, ...data]);
	}, []);

	const contextValue: IClaimVerification = useMemo(
		() => ({ data, append }),
		[append, data],
	);

	return (
		<ClaimVerificationContext.Provider value={contextValue}>
			{children}
		</ClaimVerificationContext.Provider>
	);
}

export const useClaimVerification = () => {
	return useContext(ClaimVerificationContext);
};
