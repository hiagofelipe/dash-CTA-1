import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

const CountUp = ({ value }) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.floor(v)),
    })
    return controls.stop
  }, [value])

  return (
    <span style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: 144,
      lineHeight: 1,
      color: '#ececec',
      display: 'block',
    }}>
      {display}
    </span>
  )
}

const RankingRow = ({ nome, qtd, max, accentColor, index }) => {
  const pct = max > 0 ? (qtd / max) * 100 : 0

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: '#4a4f5c',
          flex: 1,
          marginRight: 12,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {nome}
        </span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: '#ececec',
          flexShrink: 0,
        }}>
          {qtd}
        </span>
      </div>
      <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
          style={{ height: '100%', background: accentColor, position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    </div>
  )
}

const Sidebar = ({ total, typeLabel, rankLabel, items, accentColor }) => {
  const max = Math.max(...items.map(i => i.qtd ?? i.value ?? 0))
  const sum = items.reduce((s, i) => s + (i.qtd ?? i.value ?? 0), 0)

  return (
    <div style={{
      width: 280,
      flexShrink: 0,
      background: '#08090c',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 32px',
      height: 'calc(100vh - 64px)',
      overflowY: 'auto',
    }}>
      {/* KPI label */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        color: '#4a4f5c',
        textTransform: 'uppercase',
        letterSpacing: '0.3em',
        marginBottom: 20,
      }}>
        TOTAL DE {typeLabel}
      </div>

      {/* KPI hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 2,
          height: 80,
          background: accentColor,
          flexShrink: 0,
        }} />
        <div>
          <CountUp value={total} />
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            color: '#4a4f5c',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginTop: 4,
          }}>
            QTD.
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '32px 0' }} />

      {/* Ranking label */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        color: '#4a4f5c',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginBottom: 20,
      }}>
        {rankLabel}
      </div>

      {/* Ranking rows */}
      {items.map((item, i) => (
        <RankingRow
          key={i}
          nome={item.nome ?? item.label}
          qtd={item.qtd ?? item.value}
          max={max}
          accentColor={accentColor}
          index={i}
        />
      ))}

      {/* Total */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 8,
        paddingTop: 12,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: '#4a4f5c',
        }}>
          TOTAL
        </span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 14,
          color: '#efbe4e',
        }}>
          {sum}
        </span>
      </div>
    </div>
  )
}

export default Sidebar
