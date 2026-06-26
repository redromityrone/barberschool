import { describe, it, expect } from 'vitest';
import { getHaircutTypes, getHaircutTypeById, calculateProgress } from '@/services/haircut.service';

describe('haircut.service', () => {
  it('returns haircut types', () => {
    const types = getHaircutTypes();
    expect(types.length).toBeGreaterThan(0);
    expect(types[0]).toHaveProperty('id');
    expect(types[0]).toHaveProperty('steps');
  });

  it('finds haircut type by id', () => {
    const type = getHaircutTypeById('fade-medio');
    expect(type).toBeDefined();
    expect(type?.name).toBe('Fade Medio');
    expect(type?.steps.length).toBe(7);
  });

  it('returns undefined for unknown id', () => {
    expect(getHaircutTypeById('nonexistent')).toBeUndefined();
  });

  it('calculates progress correctly', () => {
    expect(calculateProgress([], 7)).toBe(0);
    expect(calculateProgress(['a', 'b', 'c'], 7)).toBe(43);
    expect(calculateProgress(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 7)).toBe(100);
  });
});
