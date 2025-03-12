"use client";
import { ClaimVerificationPayload } from "@/dto/fact-check";
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
	data: ClaimVerificationPayload[];
	append: (data: ClaimVerificationPayload[]) => void;
	remove: (index: number) => void;
}

const ClaimVerificationContext = createContext<IClaimVerification | undefined>(
	undefined,
);

export default function ClaimVerificationProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [data, setData] = useState<ClaimVerificationPayload[]>([]);

	const append = useCallback((data: ClaimVerificationPayload[]) => {
		setData((prev) => [...prev, ...data]);
	}, []);

	const remove = useCallback((index: number) => {
		setData((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const value: IClaimVerification = useMemo(
		() => ({ data, append, remove }),
		[append, data, remove],
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
