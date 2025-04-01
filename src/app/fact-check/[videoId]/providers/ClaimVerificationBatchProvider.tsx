"use client";
import { VerifyClaimsRequestDto } from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { useClaimDetection } from "./ClaimDetectionProvider";
import { useClaimVerification } from "./ClaimVerificationProvider";
import assert from "assert";
import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";

export interface IClaimVerificationBatch {
	data: ClaimVerificationResultWithDetails[];
	isLoading: boolean;
	start: () => void;
	stop: () => void;
	claimIndexesToVerify: number[];
	addClaimToVerify: (index: number) => void;
	removeClaimToVerify: (index: number) => void;
	addClaimsToVerifyBulk: (indexes: number[]) => void;
	removeClaimsToVerifyBulk: (indexes: number[]) => void;
	resetClaimsToVerify: () => void;
}

const ClaimVerificationBatchContext = createContext<
	IClaimVerificationBatch | undefined
>(undefined);

export default function ClaimVerificationBatchProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { data, append } = useClaimVerification();

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			append(chunks as ClaimVerificationResultWithDetails[]);
		},
	);

	const [claimIndexesToVerify, setClaimIndexesToVerify] = useState<number[]>(
		[],
	);

	const addClaimToVerify = useCallback((index: number) => {
		setClaimIndexesToVerify((prev) => Array.from(new Set([...prev, index])));
	}, []);

	const removeClaimToVerify = useCallback((index: number) => {
		setClaimIndexesToVerify((prev) =>
			prev.filter((_index) => _index !== index),
		);
	}, []);

	const addClaimsToVerifyBulk = useCallback((indexes: number[]) => {
		setClaimIndexesToVerify((prev) =>
			Array.from(new Set([...prev, ...indexes])),
		);
	}, []);

	const removeClaimsToVerifyBulk = useCallback((indexes: number[]) => {
		setClaimIndexesToVerify((prev) =>
			prev.filter((index) => !indexes.includes(index)),
		);
	}, []);

	const resetClaimsToVerify = useCallback(() => {
		setClaimIndexesToVerify([]);
	}, []);

	const { data: detectionResults } = useClaimDetection();

	const start = useCallback(async () => {
		const hasClaimToVerify = claimIndexesToVerify.length > 0;
		if (!hasClaimToVerify) {
			alert("검증할 주장을 선택해주세요!");
			return;
		}

		const claimsToVerify = claimIndexesToVerify.map(
			(index) => detectionResults[index],
		);

		const dto = {
			claims: claimsToVerify,
		} as VerifyClaimsRequestDto;

		await startStreaming("verify-claims", dto);

		setClaimIndexesToVerify([]);
	}, [claimIndexesToVerify, detectionResults, startStreaming]);

	const value: IClaimVerificationBatch = useMemo(
		() => ({
			data,
			isLoading,
			start,
			stop: stopStreaming,
			claimIndexesToVerify,
			addClaimToVerify,
			removeClaimToVerify,
			addClaimsToVerifyBulk,
			removeClaimsToVerifyBulk,
			resetClaimsToVerify,
		}),
		[
			data,
			isLoading,
			start,
			stopStreaming,
			claimIndexesToVerify,
			addClaimToVerify,
			removeClaimToVerify,
			addClaimsToVerifyBulk,
			removeClaimsToVerifyBulk,
			resetClaimsToVerify,
		],
	);

	return (
		<ClaimVerificationBatchContext.Provider value={value}>
			{children}
		</ClaimVerificationBatchContext.Provider>
	);
}

export const useClaimVerificationBatch = () => {
	const value = useContext(ClaimVerificationBatchContext);
	assert(
		value,
		`${ClaimVerificationBatchProvider.name} not found in the hierarchy`,
	);
	return value;
};
