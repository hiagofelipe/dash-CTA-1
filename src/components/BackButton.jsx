import { useState } from 'react'

const BackButton = ({ onBack }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onBack}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 28,
        left: 28,
        width: 36,
        height: 36,
        background: hovered ? 'var(--surface-2)' : 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 200ms',
        zIndex: 100,
        padding: 0,
      }}
      title="Voltar"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M9 2L4 7L9 12"
          stroke="#888888"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default BackButton
