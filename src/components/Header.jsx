const Header = ({ logo, accentLabel, title, startDate, endDate, onStartChange, onEndChange }) => (
  <header style={{
    height: 56,
    background: 'var(--bg-header)',
    borderBottom: '1px solid var(--border)',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 20,
    flexShrink: 0,
  }}>
    {/* Left: logo + divider + section label */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {logo}
      <div style={{ width: 1, height: 24, background: 'var(--border)' }} />
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
      }}>
        {accentLabel}
      </span>
    </div>

    {/* Center: page title */}
    <div style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
    }}>
      {title}
    </div>

    {/* Right: date pickers */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="date"
        value={startDate ?? ''}
        onChange={e => onStartChange?.(e.target.value)}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          color: 'var(--text-muted)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          padding: '4px 10px',
          outline: 'none',
          cursor: 'pointer',
        }}
      />
      <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>&#8212;</span>
      <input
        type="date"
        value={endDate ?? ''}
        onChange={e => onEndChange?.(e.target.value)}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          color: 'var(--text-muted)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          padding: '4px 10px',
          outline: 'none',
          cursor: 'pointer',
        }}
      />
    </div>
  </header>
)

export default Header
