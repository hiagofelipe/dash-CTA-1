const RankingSection = ({ title, subtitle, items, accentColor, rankLabel }) => {
  const max = Math.max(...items.map(i => i.qtd ?? i.value ?? 0))
  const total = items.reduce((s, i) => s + (i.qtd ?? i.value ?? 0), 0)

  return (
    <div style={{
      margin: '16px 40px 40px',
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

      {/* Ranking rows */}
      {items.map((item, i) => {
        const val = item.qtd ?? item.value ?? 0
        const pct = max > 0 ? (val / total) * 100 : 0
        const barPct = max > 0 ? (val / max) * 100 : 0

        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '28px 1fr 80px 56px 52px',
              alignItems: 'center',
              gap: 12,
              padding: '12px 0',
              borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            {/* Order number */}
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 11,
              color: 'var(--text-dim)',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Name */}
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 13,
              color: 'var(--text-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {item.nome ?? item.label}
            </span>

            {/* Bar */}
            <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${barPct}%`,
                background: accentColor,
                borderRadius: 2,
              }} />
            </div>

            {/* Value */}
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              color: 'var(--text)',
              textAlign: 'right',
            }}>
              {val}
            </span>

            {/* Percentage */}
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--text-muted)',
              textAlign: 'right',
            }}>
              {pct.toFixed(1)}%
            </span>
          </div>
        )
      })}

      {/* Total row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr 80px 56px 52px',
        alignItems: 'center',
        gap: 12,
        paddingTop: 12,
        marginTop: 4,
        borderTop: '1px solid var(--border)',
      }}>
        <span />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 13,
          color: 'var(--text)',
        }}>
          Total
        </span>
        <span />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 14,
          color: accentColor,
          textAlign: 'right',
        }}>
          {total}
        </span>
        <span />
      </div>
    </div>
  )
}

export default RankingSection
