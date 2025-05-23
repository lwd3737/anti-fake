import { ReactNode } from 'react';
import ClaimProvider from './providers/ClaimProvider';
import ClaimVerificationProvider from './providers/ClaimVerificationProvider';
import ClaimVerificationBatchProvider from './providers/ClaimVerificationBatchProvider';

export default function FactCheckLayout({
  params: { videoId },
  children,
}: {
  params: { videoId: string };
  children: ReactNode;
}) {
  return (
    <div className="h-full">
      <ClaimProvider videoId={videoId}>
        <ClaimVerificationProvider>
          <ClaimVerificationBatchProvider>
            {children}
          </ClaimVerificationBatchProvider>
        </ClaimVerificationProvider>
      </ClaimProvider>
    </div>
  );
}
