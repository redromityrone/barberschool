import { describe, it, expect } from 'vitest';
import {
  getReferenceCards,
  getReferenceCardsByCategory,
  REFERENCE_CATEGORIES,
} from '@/services/reference.service';

describe('reference.service', () => {
  it('returns reference cards', () => {
    const cards = getReferenceCards();
    expect(cards.length).toBeGreaterThan(0);
    expect(cards[0]).toHaveProperty('category');
  });

  it('filters by category', () => {
    const guards = getReferenceCardsByCategory('guard');
    expect(guards.length).toBeGreaterThan(0);
    guards.forEach((card) => expect(card.category).toBe('guard'));
  });

  it('has all category labels defined', () => {
    expect(REFERENCE_CATEGORIES.length).toBe(5);
  });
});
