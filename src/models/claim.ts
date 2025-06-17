export interface Claim {
  id: string;
  index: number;
  content: string;
  detectionReason: string;
  startAt: number;
  endAt: number;
}
