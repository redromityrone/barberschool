import { Link } from 'react-router-dom';
import { useSessionStore } from '@/stores/session.store';

export function HomePage() {
  const activeSession = useSessionStore((s) => s.activeSession);

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Bienvenido</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Tu herramienta para cortes guiados, fotos en Drive y referencias visuales.
      </p>

      {activeSession?.status === 'in_progress' && (
        <div
          style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Corte en progreso</p>
          <Link
            to={`/cortes/${activeSession.haircutTypeId}`}
            style={{ color: '#2563eb', textDecoration: 'none' }}
          >
            Continuar corte →
          </Link>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link
          to="/cortes"
          style={{
            display: 'block',
            background: '#2563eb',
            color: '#fff',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Iniciar corte
        </Link>
        <Link
          to="/deck"
          style={{
            display: 'block',
            background: '#fff',
            color: '#2563eb',
            border: '2px solid #2563eb',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Ver deck de referencia
        </Link>
      </div>
    </div>
  );
}
