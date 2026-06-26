import type { HaircutType } from '@/types';
import haircutTypesData from '@/data/haircut-types.json';

export function getHaircutTypes(): HaircutType[] {
  return haircutTypesData as HaircutType[];
}

export function getHaircutTypeById(id: string): HaircutType | undefined {
  return getHaircutTypes().find((type) => type.id === id);
}

export function calculateProgress(completedSteps: string[], totalSteps: number): number {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps.length / totalSteps) * 100);
}
