"use client";
import { ClaimDetectionPayload } from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export interface IClaimDetection {
	data: ClaimDetectionPayload[];
	isLoading: boolean;
	stop: () => void;
}

const ClaimDetectionContext = createContext<IClaimDetection>({
	data: [] as ClaimDetectionPayload[],
	isLoading: false,
	stop: () => {},
});

export default function ClaimDetectionProvider({
	videoId,
	children,
}: {
	videoId: string;
	children: ReactNode;
}) {
	const [data, setData] = useState<ClaimDetectionPayload[]>([]);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			setData((prev) => [...prev, ...(chunks as ClaimDetectionPayload[])]);
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

	const contextValue = useMemo(
		() => ({
			data: data,
			isLoading,
			stop: stopStreaming,
		}),
		[data, isLoading, stopStreaming],
	);

	return (
		<ClaimDetectionContext.Provider value={contextValue}>
			{children}
		</ClaimDetectionContext.Provider>
	);
}

export const useClaimDetection = () => {
	return useContext(ClaimDetectionContext);
};
