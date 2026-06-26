import type { FlowStep, DecisionCard } from '@/types';

export const FADE_LOW_FLOW: FlowStep[] = [
  {
    id: 'fade-low-1',
    flowId: 'fade-low',
    order: 1,
    title: 'Preparar herramientas',
    description: 'Consulta la referencia y prepara trimmer, clipper y peine.',
    estimatedMinutes: 2,
  },
  {
    id: 'fade-low-2',
    flowId: 'fade-low',
    order: 2,
    title: 'Peinar cabello',
    description: 'Peina el cabello en dirección natural para ver el crecimiento.',
    estimatedMinutes: 1,
  },
  {
    id: 'fade-low-3',
    flowId: 'fade-low',
    order: 3,
    title: 'Línea base',
    description: 'Define la línea base con trimmer en #0.',
    estimatedMinutes: 3,
  },
  {
    id: 'fade-low-4',
    flowId: 'fade-low',
    order: 4,
    title: 'Guía principal',
    description: 'Crea la guía con clipper en #1, dejando 1.5 cm de altura.',
    estimatedMinutes: 4,
  },
  {
    id: 'fade-low-5',
    flowId: 'fade-low',
    order: 5,
    title: 'Fundir zona media',
    description: 'Funde con #2 y #3 usando movimiento de palanca.',
    estimatedMinutes: 5,
  },
  {
    id: 'fade-low-6',
    flowId: 'fade-low',
    order: 6,
    title: 'Detallar contornos',
    description: 'Perfecciona contornos laterales con trimmer.',
    estimatedMinutes: 3,
  },
  {
    id: 'fade-low-7',
    flowId: 'fade-low',
    order: 7,
    title: 'Línea del cuello',
    description: 'Afeita la línea del cuello con precisión y simetría.',
    estimatedMinutes: 3,
  },
  {
    id: 'fade-low-8',
    flowId: 'fade-low',
    order: 8,
    title: 'Revisión final',
    description: 'Revisa simetría, aplica producto y toma foto del resultado.',
    estimatedMinutes: 2,
  },
];

export const FADE_LOW_CARDS: DecisionCard[] = [
  {
    id: 'fade-low-card-1',
    haircutTypeId: 'fade-low',
    order: 1,
    question: '¿La transición entre números es suave y sin líneas visibles?',
    hint: 'Revisa con diferente iluminación.',
  },
  {
    id: 'fade-low-card-2',
    haircutTypeId: 'fade-low',
    order: 2,
    question: '¿La línea del cuello es simétrica y limpia?',
  },
  {
    id: 'fade-low-card-3',
    haircutTypeId: 'fade-low',
    order: 3,
    question: '¿Los contornos laterales están parejos?',
  },
  {
    id: 'fade-low-card-4',
    haircutTypeId: 'fade-low',
    order: 4,
    question: '¿El largo superior está uniforme?',
  },
  {
    id: 'fade-low-card-5',
    haircutTypeId: 'fade-low',
    order: 5,
    question: '¿El resultado se parece a la imagen de referencia?',
  },
];

export const HAIRCUT_TYPES = [
  {
    id: 'fade-low',
    name: 'Degradado bajo',
    description: 'Fade bajo con transición suave cerca de las orejas.',
    referenceImagePath: 'fade-low',
    flowId: 'fade-low',
  },
  {
    id: 'fade-mid',
    name: 'Degradado medio',
    description: 'Fade medio con más volumen en la parte superior.',
    referenceImagePath: 'fade-mid',
    flowId: 'fade-mid',
  },
  {
    id: 'taper',
    name: 'Taper clásico',
    description: 'Degradado gradual sin línea marcada en los lados.',
    referenceImagePath: 'taper',
    flowId: 'taper',
  },
  {
    id: 'buzz',
    name: 'Buzz cut',
    description: 'Corte uniforme a una sola longitud.',
    referenceImagePath: 'buzz',
    flowId: 'buzz',
  },
  {
    id: 'lineup',
    name: 'Line up',
    description: 'Diseño y definición de líneas frontales y laterales.',
    referenceImagePath: 'lineup',
    flowId: 'lineup',
  },
];

export function getFlowSteps(flowId: string): FlowStep[] {
  if (flowId === 'fade-low') return FADE_LOW_FLOW;
  return FADE_LOW_FLOW.map((step) => ({
    ...step,
    id: `${flowId}-${step.order}`,
    flowId,
  }));
}

export function getDecisionCards(haircutTypeId: string): DecisionCard[] {
  if (haircutTypeId === 'fade-low') return FADE_LOW_CARDS;
  return FADE_LOW_CARDS.map((card) => ({
    ...card,
    id: `${haircutTypeId}-card-${card.order}`,
    haircutTypeId,
  }));
}
