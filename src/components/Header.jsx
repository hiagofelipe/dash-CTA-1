const Header = ({ logo, title }) => (
  <header style={{
    height: 64,
    background: '#030405',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    position: 'relative',
    zIndex: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {logo}
    </div>

    <div style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: '#4a4f5c',
      whiteSpace: 'nowrap',
    }}>
      {title}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <input
        type="date"
        defaultValue="2021-01-01"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          color: '#4a4f5c',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          padding: '4px 0',
          outline: 'none',
          cursor: 'pointer',
        }}
      />
      <span style={{
        color: '#4a4f5c',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
      }}>
        &#8212;
      </span>
      <input
        type="date"
        defaultValue="2026-06-01"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          color: '#4a4f5c',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          padding: '4px 0',
          outline: 'none',
          cursor: 'pointer',
        }}
      />
    </div>
  </header>
)

export default Header
