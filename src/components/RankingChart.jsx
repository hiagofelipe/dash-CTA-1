import { motion } from 'framer-motion'

const RankingChart = ({ title, data, accentColor }) => {
  const max = Math.max(...data.map(d => d.value))

  return (
    <div style={{
      background: '#08090c',
      border: '1px solid rgba(255,255,255,0.06)',
      padding: '28px 32px',
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 9,
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: '#4a4f5c',
          marginBottom: 12,
        }}>
          {title}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
      </div>

      <div style={{ flex: 1 }}>
        {data.map((item, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 8,
            }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: '#4a4f5c',
                flex: 1,
                marginRight: 16,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 22,
                color: '#ececec',
                flexShrink: 0,
              }}>
                {item.value}
              </span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / max) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                style={{ height: '100%', background: accentColor, position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankingChart
