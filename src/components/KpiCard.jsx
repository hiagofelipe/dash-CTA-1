import { useEffect, useRef, useState } from 'react'

const KpiCard = ({ value }) => {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const duration = 800

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return (
    <div
      style={{
        background: '#111111',
        border: '1px solid #1f1f1f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        flex: 1,
      }}
    >
      <span
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: '72px',
          color: '#ffffff',
          lineHeight: 1,
        }}
      >
        {display}
      </span>
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: '#6b6b6b',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginTop: '8px',
        }}
      >
        Qtd.
      </span>
    </div>
  )
}

export default KpiCard
