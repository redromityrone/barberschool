import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? '#2563eb' : '#6b7280',
  fontWeight: isActive ? 600 : 400,
  textDecoration: 'none',
  padding: '0.5rem 1rem',
});

export function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header
        style={{
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>BarberSchool</h1>
      </header>

      <main style={{ flex: 1, padding: '1rem', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        {children}
      </main>

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          background: '#fff',
          borderTop: '1px solid #e5e7eb',
          padding: '0.75rem 0',
        }}
      >
        <NavLink to="/" style={navLinkStyle} end>
          Inicio
        </NavLink>
        <NavLink to="/cortes" style={navLinkStyle}>
          Cortes
        </NavLink>
        <NavLink to="/deck" style={navLinkStyle}>
          Deck
        </NavLink>
      </nav>
    </div>
  );
}
