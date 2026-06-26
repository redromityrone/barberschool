export interface HaircutStep {
  id: string;
  order: number;
  title: string;
  description: string;
  referenceImageUrl: string;
  tips: string[];
  requiresPhoto: boolean;
}

export interface HaircutType {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  estimatedMinutes: number;
  steps: HaircutStep[];
  tags: string[];
}

export interface SessionPhoto {
  id: string;
  stepId: string;
  localUrl: string;
  driveFileId?: string;
  uploadedAt?: string;
  uploadStatus: 'pending' | 'uploading' | 'done' | 'error';
}

export interface HaircutSession {
  id: string;
  haircutTypeId: string;
  startedAt: string;
  completedAt?: string;
  currentStepIndex: number;
  completedSteps: string[];
  photos: SessionPhoto[];
  status: 'in_progress' | 'completed' | 'paused';
}

export interface ReferenceCard {
  id: string;
  title: string;
  category: 'angle' | 'guard' | 'texture' | 'technique' | 'finish';
  imageUrl: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
}
