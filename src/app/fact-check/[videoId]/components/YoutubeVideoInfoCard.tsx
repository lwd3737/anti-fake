import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/auth";
import { PageRoutes } from "@/constants/routes";
import GoogleAuth from "@/service/google-auth";
import YoutubeService from "@/service/youtube";
import { formatDate } from "@/utils/date";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
	videoId: string;
	className?: string;
}

export default async function YoutubeVideoInfoCard({
	videoId,
	className,
}: Props) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);
	if (!accessToken) {
		return redirect(PageRoutes.LOGIN);
	}

	const googleAuth = GoogleAuth.create(accessToken.value);
	const youtube = YoutubeService.create(googleAuth);

	// TODO: error handling
	const video = await youtube.getVideo(videoId);

	return (
		<div
			className={`flex gap-x-4 bg-white shadow-sm p-6 rounded-sm ${className}`}
		>
			<div>
				<Image
					className="rounded-lg"
					src={video.thumbnailUrl}
					width={320}
					height={180}
					alt="youtube video thumbnail"
				/>
			</div>

			<div className="flex-1">
				<h1 className="pb-2 font-bold text-xl">{video.title}</h1>
				<div className="flex gap-x-5 text-[#6B7280] text-[0.875rem]">
					<span className="flex items-center gap-x-1">
						<Image
							src="/icons/profile.svg"
							alt="channel icon"
							width={12}
							height={12}
						/>
						<small>{video.channelTitle}</small>
					</span>
					<span className="flex items-center gap-x-1">
						<Image
							src="/icons/clock.svg"
							alt="published date"
							width={12}
							height={12}
						/>
						{formatDate(new Date(video.publishedAt))}
					</span>
				</div>
			</div>
		</div>
	);
}
