import type { ReferenceCard } from '@/types';
import referenceDeckData from '@/data/reference-deck.json';

export function getReferenceCards(): ReferenceCard[] {
  return referenceDeckData as ReferenceCard[];
}

export function getReferenceCardsByCategory(category: ReferenceCard['category']): ReferenceCard[] {
  return getReferenceCards().filter((card) => card.category === category);
}

export const REFERENCE_CATEGORIES: { key: ReferenceCard['category']; label: string }[] = [
  { key: 'angle', label: 'Ángulos' },
  { key: 'guard', label: 'Guardas' },
  { key: 'texture', label: 'Texturas' },
  { key: 'technique', label: 'Técnicas' },
  { key: 'finish', label: 'Acabados' },
];
