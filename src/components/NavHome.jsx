import { useState } from 'react'
import { motion } from 'framer-motion'
import LogoCapital from './logos/LogoCapital'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const Panel = ({ label, number, name, accent, glow, onClick }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ width: 320, height: 420, cursor: 'pointer', position: 'relative' }}
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? '#0f1117' : '#08090c',
          boxShadow: hovered
            ? `inset 3px 0 12px ${glow}, 0 0 40px ${glow}`
            : `inset 3px 0 12px ${glow}`,
        }}
        transition={{ duration: 0.3 }}
        style={{
          height: '100%',
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
          borderLeft: `2px solid ${accent}`,
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Type label */}
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          color: '#4a4f5c',
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          minHeight: 18,
        }}>
          {label}
        </div>

        {/* Number hero */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 88,
            color: accent,
            lineHeight: 1,
          }}>
            {number}
          </span>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '20px 0' }} />

        {/* Section name */}
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: '#ececec',
        }}>
          {name}
        </div>

        {/* Arrow — appears on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: accent,
            marginTop: 16,
          }}
        >
          &#8594;
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const NavHome = ({ setCurrentPage }) => (
  <div style={{
    minHeight: '100vh',
    background: '#030405',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Gold accent line */}
      <div style={{
        width: 40,
        height: 2,
        background: '#efbe4e',
        opacity: 0.5,
        marginBottom: 40,
      }} />

      {/* Panels */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', gap: 16 }}
      >
        <Panel
          label="LEADS"
          number="70"
          name="AUVP Capital"
          accent="#00c875"
          glow="rgba(0,200,117,0.25)"
          onClick={() => setCurrentPage('leads-consultoria')}
        />
        <Panel
          label="CONVERSOES"
          number="8"
          name="AUVP Capital"
          accent="#00c875"
          glow="rgba(0,200,117,0.25)"
          onClick={() => setCurrentPage('conversoes-consultoria')}
        />
        <Panel
          label=""
          number="39"
          name="AUVP Analitica"
          accent="#4d94ff"
          glow="rgba(77,148,255,0.25)"
          onClick={() => setCurrentPage('leads-analitica')}
        />
      </motion.div>
    </div>

    {/* Watermark logo */}
    <div style={{ position: 'fixed', bottom: 32, right: 40, opacity: 0.15 }}>
      <LogoCapital height={100} />
    </div>
  </div>
)

export default NavHome
