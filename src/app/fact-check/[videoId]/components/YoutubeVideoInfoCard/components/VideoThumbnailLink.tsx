"use client";

import Image from "next/image";

interface Props {
	url: string;
	width: number;
	height: number;
	videoId: string;
}

export default function VideoThumbnailLink({
	url,
	width,
	height,
	videoId,
}: Props) {
	return (
		<div className="relative">
			<Image
				className="hover:opacity-60 rounded-lg"
				src={url}
				width={width * 2}
				height={height * 2}
				alt="youtube video thumbnail"
			/>
			<Image
				className="top-1/2 left-1/2 absolute opacity-0 hover:opacity-100 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
				src="/icons/link2.svg"
				alt="youtube video link"
				width={50}
				height={50}
				onClick={() =>
					window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
				}
			/>
		</div>
	);
}
