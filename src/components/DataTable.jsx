const DataTable = ({ rows, colLabel, accentColor }) => {
  const total = rows.reduce((sum, r) => sum + r.qtd, 0)
  const borderColor = accentColor || '#2d6a47'

  return (
    <div
      style={{
        background: '#111111',
        border: '1px solid #1f1f1f',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Outfit, sans-serif' }}>
        <thead>
          <tr style={{ background: '#1a1a1a' }}>
            <th
              style={{
                padding: '10px 16px',
                textAlign: 'left',
                fontSize: '11px',
                color: '#6b6b6b',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 400,
              }}
            >
              {colLabel}
            </th>
            <th
              style={{
                padding: '10px 16px',
                textAlign: 'right',
                fontSize: '11px',
                color: '#6b6b6b',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 400,
              }}
            >
              Quantidade
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ background: i % 2 === 0 ? '#111111' : '#141414' }}
            >
              <td
                style={{
                  padding: '9px 16px',
                  fontSize: '13px',
                  color: '#e5e5e5',
                  borderLeft: `3px solid ${borderColor}`,
                  maxWidth: '200px',
                  wordBreak: 'break-word',
                  lineHeight: '1.4',
                }}
              >
                {row.campanha || row.oferta}
              </td>
              <td
                style={{
                  padding: '9px 16px',
                  fontSize: '13px',
                  color: '#e5e5e5',
                  textAlign: 'right',
                }}
              >
                {row.qtd}
              </td>
            </tr>
          ))}
          <tr
            style={{
              borderTop: '1px solid #2a2a2a',
              background: '#111111',
            }}
          >
            <td
              style={{
                padding: '9px 16px',
                fontSize: '13px',
                color: '#e5e5e5',
                fontWeight: 700,
                borderLeft: `3px solid ${borderColor}`,
              }}
            >
              Total
            </td>
            <td
              style={{
                padding: '9px 16px',
                fontSize: '13px',
                color: '#e5e5e5',
                fontWeight: 700,
                textAlign: 'right',
              }}
            >
              {total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
