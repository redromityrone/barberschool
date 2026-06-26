import { Link } from 'react-router-dom';
import { getHaircutTypes } from '@/services/haircut.service';

export function HaircutsPage() {
  const types = getHaircutTypes();

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tipos de corte</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {types.map((type) => (
          <Link
            key={type.id}
            to={`/cortes/${type.id}`}
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{type.name}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              {type.description}
            </p>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              {type.steps.length} pasos · ~{type.estimatedMinutes} min
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
