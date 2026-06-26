import { useParams, Link } from 'react-router-dom';
import { getHaircutTypeById, calculateProgress } from '@/services/haircut.service';
import { useSessionStore } from '@/stores/session.store';

export function FlowPage() {
  const { id } = useParams<{ id: string }>();
  const haircutType = id ? getHaircutTypeById(id) : undefined;
  const { activeSession, startSession, completeStep, endSession } = useSessionStore();

  if (!haircutType) {
    return (
      <div>
        <p>Corte no encontrado.</p>
        <Link to="/cortes">Volver</Link>
      </div>
    );
  }

  const session =
    activeSession?.haircutTypeId === haircutType.id ? activeSession : null;
  const currentStep = session ? haircutType.steps[session.currentStepIndex] : null;
  const progress = session
    ? calculateProgress(session.completedSteps, haircutType.steps.length)
    : 0;
  const isLastStep = session ? session.currentStepIndex >= haircutType.steps.length - 1 : false;
  const isCompleted = session?.status === 'completed';

  if (!session) {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{haircutType.name}</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{haircutType.description}</p>
        <h3 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Pasos del corte</h3>
        <ol style={{ paddingLeft: '1.25rem', marginBottom: '2rem' }}>
          {haircutType.steps.map((step) => (
            <li key={step.id} style={{ marginBottom: '0.5rem', color: '#374151' }}>
              {step.title}
            </li>
          ))}
        </ol>
        <button
          onClick={() => startSession(haircutType.id)}
          style={{
            width: '100%',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Iniciar corte
        </button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>¡Corte completado!</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Completaste {haircutType.name} con {session.completedSteps.length} pasos.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (!currentStep) return null;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600 }}>{haircutType.name}</span>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Paso {session.currentStepIndex + 1} de {haircutType.steps.length}
          </span>
        </div>
        <div
          style={{
            background: '#e5e7eb',
            borderRadius: '9999px',
            height: '0.5rem',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: '#2563eb',
              height: '100%',
              width: `${progress}%`,
              transition: 'width 0.3s',
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          {currentStep.title}
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{currentStep.description}</p>
        {currentStep.tips.length > 0 && (
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#374151' }}>
            {currentStep.tips.map((tip) => (
              <li key={tip} style={{ marginBottom: '0.25rem' }}>
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>

      {currentStep.requiresPhoto && (
        <button
          style={{
            width: '100%',
            background: '#f3f4f6',
            border: '1px dashed #d1d5db',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          📷 Tomar foto (próximamente: Drive)
        </button>
      )}

      <button
        onClick={() => {
          completeStep(currentStep.id);
          if (isLastStep) endSession();
        }}
        style={{
          width: '100%',
          background: '#16a34a',
          color: '#fff',
          border: 'none',
          padding: '1rem',
          borderRadius: '0.5rem',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        {isLastStep ? 'Finalizar corte' : 'Completar paso'}
      </button>
    </div>
  );
}
