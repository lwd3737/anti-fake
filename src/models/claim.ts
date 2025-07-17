export interface Claim {
  id: string;
  index: number;
  content: string;
  context: string;
  detectionReason: string;
  startAt?: number;
  endAt?: number;
}
