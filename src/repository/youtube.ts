import prisma from './prisma';
import { Prisma } from '/prisma/generated/prisma';

export const getYoutubeVideo = async (
  id: string,
  select?: Prisma.YoutubeVideoSelect,
) => {
  return await prisma.youtubeVideo.findUnique({
    where: {
      id,
    },
    select,
  });
};

export const createYoutubeVideo = async (
  data: Prisma.YoutubeVideoCreateInput,
  select?: Prisma.YoutubeVideoSelect,
) => {
  return await prisma.youtubeVideo.create({
    data,
    select,
  });
};
