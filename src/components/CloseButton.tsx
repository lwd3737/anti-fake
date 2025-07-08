'use client';
import Image from 'next/image';
import { MouseEvent } from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
  onClick: () => void;
}

export default function CloseButton({
  width = 15,
  height = 15,
  className,
  onClick,
}: Props) {
  const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    onClick();
    window.location.reload();
  };

  return (
    <button className={className} onClick={handleClick}>
      <Image src="/icons/close.svg" alt="close" width={width} height={height} />
    </button>
  );
}
