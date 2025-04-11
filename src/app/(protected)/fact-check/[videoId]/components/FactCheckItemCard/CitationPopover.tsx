import { EvidenceCitation } from "@/models/evidence-retrieval";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
	citations: EvidenceCitation[];
}

export default function CitationPopover({ citations }: Props) {
	const [isShown, setIsShown] = useState(false);
	const [direction, setDirection] = useState<
		"top" | "middle" | "bottom" | null
	>(null);

	const directionStyle = useMemo(() => {
		const defaultBalloonTailStyle =
			'before:-left-4 before:absolute before:border-[transparent_#847c7c1c_transparent_transparent] before:border-t-[0.5rem] before:border-r-[1rem] before:border-b-[0.5rem] before:content-[""]';

		switch (direction) {
			case "top": {
				const balloonTailStyle = `${defaultBalloonTailStyle} before:bottom-2`;
				return `-bottom-0 ${balloonTailStyle}`;
			}
			case "middle": {
				const balloonTailStyle = `${defaultBalloonTailStyle} before:top-1/2 before:-translate-y-1/2`;
				return `top-1/2 -translate-y-1/2 ${balloonTailStyle}`;
			}
			case "bottom": {
				const balloonTailStyle = `${defaultBalloonTailStyle} before:top-2`;
				return `-top-0 ${balloonTailStyle}`;
			}
		}
	}, [direction]);

	const popoverElRef = useRef<HTMLElement>(null);

	useEffect(
		function addCloseEventHandlerOnIsShown() {
			const popoverEl = popoverElRef.current;
			if (!popoverEl) return;

			const handleClosePopoverOnOutsideClick = (ev: MouseEvent) => {
				const target = ev.target as HTMLElement;

				if (popoverEl.contains(target)) return;

				setIsShown(false);
				setDirection(null);
			};

			if (!isShown) {
				document.removeEventListener("click", handleClosePopoverOnOutsideClick);
				return;
			}

			document.addEventListener("click", handleClosePopoverOnOutsideClick);

			return () =>
				document.removeEventListener("click", handleClosePopoverOnOutsideClick);
		},
		[isShown],
	);

	const handleToggleClick = (ev: React.MouseEvent) => {
		if (isShown) {
			setIsShown(false);
		}

		setIsShown((prev) => !prev);

		const posY = ev.clientY / window.innerHeight;
		if (posY < 0.4) {
			setDirection("bottom");
		} else if (posY > 0.6) {
			setDirection("top");
		} else {
			setDirection("middle");
		}
	};

	// TODO: theme 적용
	return (
		<span className="flex">
			<button
				className="flex gap-x-1 bg-surface-subtle hover:bg-gray-200 px-3 py-[0.375rem] rounded-lg font-medium text-[0.875rem]"
				onClick={handleToggleClick}
			>
				<Image
					src="/icons/link.svg"
					alt="source links"
					width={12}
					height={12}
				/>
				출처
			</button>
			{isShown && (
				<div className="z-100 relative">
					<section
						className={`left-4 absolute flex flex-col gap-y-2 bg-white shadow-md py-4 rounded-lg w-[25vw] h-[40vh] ${directionStyle}`}
						ref={popoverElRef}
					>
						<h3 className="px-4 font-semibold text-[0.875rem] text-text-base text-center">
							인용
						</h3>
						<ol className="flex-[1_1_0px] px-4 overflow-y-auto">
							{citations.map(
								({ title, url, description, image, siteName }, index) => {
									return (
										<li
											className="py-3 border-surface-subtle border-b border-solid"
											key={index}
										>
											<a
												className="font-medium text-[0.875rem] text-text-subtle"
												href={url}
												target="_blank"
											>
												<span className="flex flex-col gap-y-2">
													<span className="flex items-center gap-x-1">
														{image && (
															<Image
																className="rounded-[50%]"
																src={image}
																alt=""
																width={18}
																height={18}
															/>
														)}
														<span className="font-semibold text-[14px] text-text-base">
															{siteName}
														</span>
													</span>

													<span className="flex flex-col gap-y-1">
														{title && (
															<span className="font-bold text-text-base leading-4">
																{title}
															</span>
														)}
														{description && (
															<span className="max-h-[50px] font-medium text-[12px] text-text-subtle-extra text-ellipsis line-clamp-3 leading-4">
																{description}
															</span>
														)}
													</span>
												</span>
											</a>
										</li>
									);
								},
							)}
						</ol>
					</section>
				</div>
			)}
		</span>
	);
}
