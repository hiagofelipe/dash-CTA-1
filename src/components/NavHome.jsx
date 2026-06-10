import { useState } from 'react'
import LogoCapital from './logos/LogoCapital'
import { formatNumber } from '../lib/utils'

const NavCard = ({ label, number, name, footer, accentColor, onClick }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 300,
        height: 380,
        background: hovered ? 'var(--surface-2)' : 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--border-light)' : 'var(--border)'}`,
        borderTop: `2px solid ${accentColor}`,
        borderRadius: 12,
        padding: 32,
        cursor: 'pointer',
        transition: 'background 200ms, border-color 200ms',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Label topo */}
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        minHeight: 16,
        marginBottom: 16,
      }}>
        {label}
      </div>

      {/* Número hero */}
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: 64,
        color: accentColor,
        lineHeight: 1,
        marginBottom: 20,
      }}>
        {number}
      </div>

      {/* Nome */}
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: 18,
        color: 'var(--text)',
        marginBottom: 8,
      }}>
        {name}
      </div>

      {/* Footer */}
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 12,
        color: 'var(--text-dim)',
        flex: 1,
      }}>
        {footer}
      </div>

      {/* Seta hover */}
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 18,
        color: accentColor,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 200ms',
        marginTop: 8,
      }}>
        &#8594;
      </div>
    </div>
  )
}

const NavHome = ({ setCurrentPage, ctaData, totalConversoes }) => (
  <div style={{
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'column',
    gap: 40,
  }}>
    <div style={{ display: 'flex', gap: 20 }}>
      <NavCard
        label="LEADS"
        number={ctaData?.leads_consultoria?.total != null ? formatNumber(ctaData.leads_consultoria.total) : '—'}
        name="AUVP Capital"
        footer="Consultoria de investimentos"
        accentColor="var(--capital)"
        onClick={() => setCurrentPage('leads-consultoria')}
      />
      <NavCard
        label="CONVERSÕES"
        number={totalConversoes != null ? formatNumber(totalConversoes) : '—'}
        name="AUVP Capital"
        footer="Consultoria de investimentos"
        accentColor="var(--capital)"
        onClick={() => setCurrentPage('conversoes-consultoria')}
      />
      <NavCard
        label="LEADS"
        number={ctaData?.leads_analitica?.total != null ? formatNumber(ctaData.leads_analitica.total) : '—'}
        name="AUVP Analítica"
        footer="Plataforma de análise"
        accentColor="var(--analitica)"
        onClick={() => setCurrentPage('leads-analitica')}
      />
    </div>

    <div style={{ position: 'fixed', bottom: 32, right: 40, opacity: 0.2 }}>
      <LogoCapital height={120} />
    </div>
  </div>
)

export default NavHome
