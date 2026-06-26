import { useState } from 'react';
import { getReferenceCards, REFERENCE_CATEGORIES } from '@/services/reference.service';
import type { ReferenceCard } from '@/types';

export function DeckPage() {
  const [activeCategory, setActiveCategory] = useState<ReferenceCard['category'] | 'all'>('all');
  const allCards = getReferenceCards();
  const cards =
    activeCategory === 'all'
      ? allCards
      : allCards.filter((c) => c.category === activeCategory);

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Deck de referencia</h2>

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          marginBottom: '1.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        <button
          onClick={() => setActiveCategory('all')}
          style={tabStyle(activeCategory === 'all')}
        >
          Todos
        </button>
        {REFERENCE_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={tabStyle(activeCategory === cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '0.75rem',
            }}
          >
            <div
              style={{
                background: '#f3f4f6',
                borderRadius: '0.25rem',
                height: '80px',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '0.75rem',
              }}
            >
              Imagen
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }}>{card.title}</h3>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: '0.5rem 0.75rem',
    borderRadius: '9999px',
    border: '1px solid',
    borderColor: active ? '#2563eb' : '#e5e7eb',
    background: active ? '#eff6ff' : '#fff',
    color: active ? '#2563eb' : '#6b7280',
    fontSize: '0.75rem',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };
}
