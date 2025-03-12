"use client";
import {
	ClaimVerificationPayload,
	VerifyClaimsRequestDto,
} from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useClaimDetection } from "./ClaimDetectionProvider";
import { useClaimVerification } from "./ClaimVerificationProvider";
import assert from "assert";

export interface IClaimVerificationBatch {
	data: ClaimVerificationPayload[];
	isLoading: boolean;
	start: () => void;
	stop: () => void;

	isBatchMode: boolean;
	switchToBatchMode: () => void;
	cancelBatchMode: () => void;

	claimIndexesToVerifiy: Set<number>;
	updateClaimToVerifiy: (index: number, isSelected: boolean) => void;
	updateClaimsToVerifiyBulk: (indexes: number[], isSelected: boolean) => void;
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
			append(chunks as ClaimVerificationPayload[]);
		},
	);

	const [claimIndexesToVerifiy, setClaimIndexesToVerify] = useState<
		Set<number>
	>(new Set());

	useEffect(
		function initClaimsCheckedOnClaimsUpdated() {
			setClaimIndexesToVerify(new Set(data.map((_, index) => index)));
		},
		[data],
	);

	const updateClaimToVerifiy = useCallback(
		(index: number, isSelected: boolean) => {
			setClaimIndexesToVerify((prev) =>
				isSelected
					? new Set([...Array.from(prev), index])
					: new Set([...Array.from(prev).filter((_index) => _index !== index)]),
			);
		},
		[],
	);

	const updateClaimsToVerifiyBulk = useCallback(
		(indexes: number[], isSelected: boolean) => {
			setClaimIndexesToVerify((prev) =>
				isSelected
					? new Set([...Array.from(prev), ...indexes])
					: new Set([
							...Array.from(prev).filter((_index) => !indexes.includes(_index)),
					  ]),
			);
		},
		[],
	);

	const [isBatchMode, setIsBatchMode] = useState(false);

	const switchToBatchMode = useCallback(() => {
		setIsBatchMode(true);
		setClaimIndexesToVerify(new Set(data.map((_, index) => index)));
	}, [data]);

	const cancelBatchMode = useCallback(() => {
		setIsBatchMode(false);
	}, []);

	const { data: detectionResults } = useClaimDetection();

	const start = useCallback(async () => {
		if (!isBatchMode) return;

		const hasClaimToVerify = claimIndexesToVerifiy.size > 0;
		if (!hasClaimToVerify) {
			alert("검증할 주장을 선택해주세요!");
			return;
		}

		const claimsToVerify = Array.from(claimIndexesToVerifiy.values()).map(
			(index) => detectionResults[index],
		);

		const dto = {
			claims: claimsToVerify,
		} as VerifyClaimsRequestDto;

		await startStreaming("verify-claims", dto);

		setIsBatchMode(false);
	}, [claimIndexesToVerifiy, detectionResults, isBatchMode, startStreaming]);

	const value: IClaimVerificationBatch = useMemo(
		() => ({
			data,
			isLoading,
			start,
			stop: stopStreaming,

			isBatchMode,
			switchToBatchMode,
			cancelBatchMode,

			claimIndexesToVerifiy,
			updateClaimToVerifiy,
			updateClaimsToVerifiyBulk,
		}),
		[
			cancelBatchMode,
			claimIndexesToVerifiy,
			data,
			isBatchMode,
			isLoading,
			start,
			stopStreaming,
			switchToBatchMode,
			updateClaimToVerifiy,
			updateClaimsToVerifiyBulk,
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
