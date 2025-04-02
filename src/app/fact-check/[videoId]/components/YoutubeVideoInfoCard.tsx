import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/auth";
import { PageRoutes } from "@/constants/routes";
import GoogleAuth from "@/service/google-auth";
import YoutubeService from "@/service/youtube";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
	videoId: string;
}

export default async function YoutubeVideoInfoCard({ videoId }: Props) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);
	if (!accessToken) {
		return redirect(PageRoutes.LOGIN);
	}

	const googleAuth = GoogleAuth.create(accessToken.value);
	const youtube = YoutubeService.create(googleAuth);

	const video = await youtube.getVideo(videoId);

	return (
		<div>
			<h1>{video.title}</h1>
			<div>
				<small>{video.channelTitle}</small>
				<small>{video.channelTitle}</small>
			</div>
		</div>
	);
}
