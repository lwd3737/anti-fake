'use client';
import CloseButton from '@/components/CloseButton';
import { PageRoutes } from '@/constants/routes';
import { YoutubeVideo } from '@/models/youtube';
import { formatDate } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: string;
  video: YoutubeVideo;
  claimCount: number;
  verificationCount: number;
  createdAt: Date;
  onClose: (id: string) => void;
}

export default function FactCheckSessionCard({
  id,
  video,
  claimCount,
  verificationCount,
  createdAt,
  onClose,
}: Props) {
  return (
    <li className="bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300">
      <Link href={PageRoutes.factCheckSession(id)}>
        <div className="flex items-start gap-x-4 px-8 py-4">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={150}
            height={150}
          />
          <div className="flex flex-col justify-between">
            <h2 className="font-semibold text-base">{video.title}</h2>
            <div className="flex flex-col gap-y-1 text-gray-500 text-sm">
              <span>{video.channelTitle}</span>
              <span>게시일: {formatDate(video.publishedAt)}</span>
            </div>
          </div>
          <CloseButton onClick={() => onClose(id)} />
        </div>
        <div className="flex justify-between bg-gray-50 px-8 py-4 text-sm">
          <div className="flex gap-x-3 font-semibold text-gray-600">
            <span className="text-brand">주장 {claimCount}개</span>
            <span className="text-yellow-800">
              검증 {verificationCount}/{claimCount}
            </span>
          </div>
          <span className="text-gray-500">{formatDate(createdAt)}</span>
        </div>
      </Link>
    </li>
  );
}
