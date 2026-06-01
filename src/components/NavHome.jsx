import { useState } from 'react'
import LogoCapital from './logos/LogoCapital'

const NavCard = ({ label, title, borderColor, onClick }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#1a1a1a' : '#111111',
        border: `1px solid #1f1f1f`,
        borderLeft: `3px solid ${borderColor}`,
        padding: '32px',
        cursor: 'pointer',
        transition: 'background 200ms',
        borderRadius: '4px',
        minWidth: '240px',
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '10px',
          color: '#6b6b6b',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '8px',
          minHeight: '16px',
        }}
      >
        {label || ' '}
      </div>
      <div
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          fontSize: '20px',
          color: '#e5e5e5',
        }}
      >
        {title}
      </div>
    </div>
  )
}

const NavHome = ({ setCurrentPage }) => {
  return (
    <div
      className="fade-in-up"
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            color: '#6b6b6b',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          Navegação
        </div>

        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <NavCard
            label="Leads"
            title="AUVP Capital"
            borderColor="#2d6a47"
            onClick={() => setCurrentPage('leads-consultoria')}
          />
          <NavCard
            label="Conversões"
            title="AUVP Capital"
            borderColor="#2d6a47"
            onClick={() => setCurrentPage('conversoes-consultoria')}
          />
          <NavCard
            label=""
            title="AUVP Analítica"
            borderColor="#2563a8"
            onClick={() => setCurrentPage('leads-analitica')}
          />
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '40px',
          opacity: 0.4,
        }}
      >
        <LogoCapital height={40} />
      </div>
    </div>
  )
}

export default NavHome
