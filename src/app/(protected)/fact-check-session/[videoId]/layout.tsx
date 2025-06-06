import { ReactNode } from 'react';

export default function FactCheckLayout({
  params: { videoId },
  children,
}: {
  params: { videoId: string };
  children: ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
