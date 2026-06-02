const ChartCard = ({ title, subtitle, accentColor, children }) => (
  <div style={{
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: 28,
    position: 'relative',
  }}>
    {/* Accent dot */}
    <div style={{
      position: 'absolute',
      top: 28,
      right: 28,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: accentColor,
    }} />

    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--text)',
        marginBottom: 4,
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: 13,
          color: 'var(--text-muted)',
        }}>
          {subtitle}
        </div>
      )}
    </div>

    {children}
  </div>
)

export default ChartCard
