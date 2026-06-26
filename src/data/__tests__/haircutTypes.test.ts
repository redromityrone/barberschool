import { HAIRCUT_TYPES, getFlowSteps, getDecisionCards } from '@/data/haircutTypes';

describe('haircutTypes data', () => {
  it('should have 5 predefined haircut types', () => {
    expect(HAIRCUT_TYPES).toHaveLength(5);
  });

  it('should return flow steps for fade-low', () => {
    const steps = getFlowSteps('fade-low');
    expect(steps).toHaveLength(8);
    expect(steps[0].title).toBe('Preparar herramientas');
  });

  it('should return decision cards for fade-low', () => {
    const cards = getDecisionCards('fade-low');
    expect(cards).toHaveLength(5);
    expect(cards[0].question).toContain('transición');
  });

  it('should generate flow steps for other haircut types', () => {
    const steps = getFlowSteps('buzz');
    expect(steps).toHaveLength(8);
    expect(steps[0].flowId).toBe('buzz');
  });
});
