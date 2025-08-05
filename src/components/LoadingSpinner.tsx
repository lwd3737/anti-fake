import Image from 'next/image';

interface Props {
  width: number;
  height: number;
  className?: string;
}

export default function LoadingSpinner({ className, width, height }: Props) {
  return (
    <Image
      className={`animate-spin ${className}`}
      src="/icons/loading.svg"
      alt={'status icon'}
      width={width}
      height={height}
    />
  );
}
