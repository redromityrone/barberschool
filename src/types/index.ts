export type SessionStatus = 'in_progress' | 'completed' | 'cancelled';

export type PhotoLabel = 'before' | 'during' | 'after';

export type CardAnswer = 'yes' | 'no' | 'partial';

export interface HaircutSession {
  id: string;
  haircutTypeId: string;
  startedAt: string;
  completedAt?: string;
  notes?: string;
  status: SessionStatus;
}

export interface Photo {
  id: string;
  sessionId: string;
  filePath: string;
  takenAt: string;
  label?: PhotoLabel;
}

export interface HaircutType {
  id: string;
  name: string;
  description: string;
  referenceImagePath: string;
  flowId: string;
}

export interface FlowStep {
  id: string;
  flowId: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes?: number;
}

export interface DecisionCard {
  id: string;
  haircutTypeId: string;
  question: string;
  hint?: string;
  order: number;
}

export interface CardResponse {
  id: string;
  sessionId: string;
  cardId: string;
  answer: CardAnswer;
  answeredAt: string;
}
