const Header = ({ logo, title, accentColor }) => {
  return (
    <header
      style={{
        background: '#0a0a0a',
        borderBottom: '1px solid #1f1f1f',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {logo}
      </div>

      <div
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          fontSize: '18px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#e5e5e5',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="date"
          defaultValue="2021-01-01"
          style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            color: '#e5e5e5',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
            padding: '6px 12px',
            outline: 'none',
            borderRadius: 0,
          }}
        />
        <span style={{ color: '#6b6b6b', fontSize: '14px' }}>—</span>
        <input
          type="date"
          defaultValue="2026-06-01"
          style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            color: '#e5e5e5',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
            padding: '6px 12px',
            outline: 'none',
            borderRadius: 0,
          }}
        />
      </div>
    </header>
  )
}

export default Header
