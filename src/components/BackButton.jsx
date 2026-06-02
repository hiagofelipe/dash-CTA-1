import { motion } from 'framer-motion'

const BackButton = ({ onBack, accentColor = '#4a4f5c' }) => (
  <motion.button
    onClick={onBack}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{
      position: 'fixed',
      bottom: 32,
      left: 32,
      width: 40,
      height: 40,
      background: '#08090c',
      border: '1px solid rgba(255,255,255,0.06)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      borderRadius: 0,
      padding: 0,
    }}
    title="Voltar"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 3L5 8L10 13"
        stroke="#4a4f5c"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.button>
)

export default BackButton
