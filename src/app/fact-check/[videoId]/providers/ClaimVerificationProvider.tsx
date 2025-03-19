"use client";
import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import assert from "assert";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

export interface IClaimVerification {
	data: ClaimVerificationResultWithDetails[];
	append: (data: ClaimVerificationResultWithDetails[]) => void;
	remove: (index: number) => void;
	clear: () => void;
}

const ClaimVerificationContext = createContext<IClaimVerification | undefined>(
	undefined,
);

export default function ClaimVerificationProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [data, setData] = useState<ClaimVerificationResultWithDetails[]>([]);

	const append = useCallback((data: ClaimVerificationResultWithDetails[]) => {
		setData((prev) => [...prev, ...data]);
	}, []);

	const remove = useCallback((index: number) => {
		setData((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const clear = useCallback(() => {
		setData([]);
	}, []);

	const value: IClaimVerification = useMemo(
		() => ({ data, append, remove, clear }),
		[append, clear, data, remove],
	);

	return (
		<ClaimVerificationContext.Provider value={value}>
			{children}
		</ClaimVerificationContext.Provider>
	);
}

export const useClaimVerification = () => {
	const value = useContext(ClaimVerificationContext);
	assert(value, `${ClaimVerificationProvider.name} not found in the hierarchy`);
	return value;
};
