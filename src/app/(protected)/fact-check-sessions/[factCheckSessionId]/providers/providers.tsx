import { FactCheckSession } from '@/models/fact-check-session';
import ClaimProvider from './ClaimProvider';
import ClaimVerificationProvider from './ClaimVerificationProvider';

export default function FactCheckSessionProviders({
  children,
  factCheckSession,
  videoSummary,
}: {
  children: React.ReactNode;
  factCheckSession: FactCheckSession;
  videoSummary: string | null;
}) {
  return (
    <ClaimProvider
      factCheckSession={factCheckSession}
      videoSummary={videoSummary}
    >
      <ClaimVerificationProvider factCheckSession={factCheckSession}>
        {children}
      </ClaimVerificationProvider>
    </ClaimProvider>
  );
}
