import { FactCheckSession } from '@/models/fact-check-session';
import New__ClaimProvider from './ClaimProvider.new';
import ClaimVerificationProvider from './ClaimVerificationProvider';

export default function FactCheckSessionProviders({
  children,
  factCheckSession,
}: {
  children: React.ReactNode;
  factCheckSession: FactCheckSession;
}) {
  return (
    <New__ClaimProvider factCheckSession={factCheckSession}>
      <ClaimVerificationProvider factCheckSession={factCheckSession}>
        {children}
      </ClaimVerificationProvider>
    </New__ClaimProvider>
  );
}
