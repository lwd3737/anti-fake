"use client";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import { ClaimDetectionResult } from "@/models/claim-detection";
import assert from "assert";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export interface IClaimDetection {
	data: ClaimDetectionResult[];
	isLoading: boolean;
	stop: () => void;
	remove: (index: number) => void;
	retry: () => void;
}

const ClaimDetectionContext = createContext<IClaimDetection | undefined>(
	undefined,
);

export default function ClaimDetectionProvider({
	videoId,
	children,
}: {
	videoId: string;
	children: ReactNode;
}) {
	const [data, setData] = useState<ClaimDetectionResult[]>([]);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			setData((prev) => [...prev, ...(chunks as ClaimDetectionResult[])]);
		},
	);

	const isMountedRef = useRef(false);

	useEffect(
		function detectClaimsOnMount() {
			if (isMountedRef.current) {
				return;
			}
			isMountedRef.current = true;
			startStreaming("detect-claims", { videoId });
		},
		[startStreaming, videoId],
	);

	const remove = useCallback((index: number) => {
		setData((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const retry = useCallback(() => {
		setData([]);
		startStreaming("detect-claims", { videoId });
	}, [startStreaming, videoId]);

	const value: IClaimDetection = useMemo(
		() => ({
			data: data,
			isLoading,
			stop: stopStreaming,
			remove,
			retry,
		}),
		[data, isLoading, remove, retry, stopStreaming],
	);

	return (
		<ClaimDetectionContext.Provider value={value}>
			{children}
		</ClaimDetectionContext.Provider>
	);
}

export const useClaimDetection = () => {
	const value = useContext(ClaimDetectionContext);
	assert(value, `${ClaimDetectionProvider.name} not found`);
	return value;
};
