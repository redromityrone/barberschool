import { create } from 'zustand';
import type { HaircutSession } from '@/types';

interface SessionState {
  activeSession: HaircutSession | null;
  startSession: (haircutTypeId: string) => void;
  completeStep: (stepId: string) => void;
  goToStep: (index: number) => void;
  endSession: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  activeSession: null,

  startSession: (haircutTypeId) => {
    const session: HaircutSession = {
      id: crypto.randomUUID(),
      haircutTypeId,
      startedAt: new Date().toISOString(),
      currentStepIndex: 0,
      completedSteps: [],
      photos: [],
      status: 'in_progress',
    };
    set({ activeSession: session });
  },

  completeStep: (stepId) => {
    const { activeSession } = get();
    if (!activeSession) return;

    const completedSteps = activeSession.completedSteps.includes(stepId)
      ? activeSession.completedSteps
      : [...activeSession.completedSteps, stepId];

    set({
      activeSession: {
        ...activeSession,
        completedSteps,
        currentStepIndex: activeSession.currentStepIndex + 1,
      },
    });
  },

  goToStep: (index) => {
    const { activeSession } = get();
    if (!activeSession) return;
    set({ activeSession: { ...activeSession, currentStepIndex: index } });
  },

  endSession: () => {
    const { activeSession } = get();
    if (!activeSession) return;
    set({
      activeSession: {
        ...activeSession,
        status: 'completed',
        completedAt: new Date().toISOString(),
      },
    });
  },
}));
