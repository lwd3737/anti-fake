import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/auth";
import { PageRoutes } from "@/constants/routes";
import GoogleAuth from "@/service/google-auth";
import YoutubeService from "@/service/youtube";
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

	const video = await youtube.getVideo(videoId);

	return (
		<div className={`flex gap-x-4 ${className}`}>
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
				<h1>{video.title}</h1>
				<div>
					<small>{video.channelTitle}</small>
					<small>{video.channelTitle}</small>
				</div>
			</div>
		</div>
	);
}
