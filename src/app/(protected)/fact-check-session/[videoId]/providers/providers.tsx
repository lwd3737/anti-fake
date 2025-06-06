import { FactCheckSession } from '@/models/fact-check-session';
import ClaimProvider from './ClaimProvider';
import ClaimVerificationProvider from './ClaimVerificationProvider';
import ClaimVerificationBatchProvider from './ClaimVerificationBatchProvider';

export default function FactCheckSessionProviders({
  children,
  factCheckSession,
}: {
  children: React.ReactNode;
  factCheckSession: FactCheckSession;
}) {
  return (
    <ClaimProvider factCheckSession={factCheckSession}>
      <ClaimVerificationProvider>
        <ClaimVerificationBatchProvider>
          {children}
        </ClaimVerificationBatchProvider>
      </ClaimVerificationProvider>
    </ClaimProvider>
  );
}
