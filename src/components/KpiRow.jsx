const KpiCard = ({ label, value, extra, accentColor, isMain }) => (
  <div style={{
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '20px 24px',
  }}>
    <div style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-muted)',
      marginBottom: 8,
    }}>
      {label}
    </div>
    <div style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: 800,
      fontSize: 32,
      color: isMain ? accentColor : 'var(--text)',
      lineHeight: 1,
      marginBottom: extra ? 6 : 0,
    }}>
      {value}
    </div>
    {extra && (
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 12,
        color: 'var(--text-muted)',
      }}>
        {extra}
      </div>
    )}
  </div>
)

const KpiRow = ({ kpis, accentColor }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    margin: '32px 40px',
  }}>
    {kpis.map((kpi, i) => (
      <KpiCard
        key={i}
        label={kpi.label}
        value={kpi.value}
        extra={kpi.extra}
        accentColor={accentColor}
        isMain={i === 0}
      />
    ))}
  </div>
)

export default KpiRow
