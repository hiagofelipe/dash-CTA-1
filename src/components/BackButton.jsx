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
        bottom: '32px',
        left: '40px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'color 200ms',
        zIndex: 100,
      }}
      title="Voltar"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16"
          cy="16"
          r="15"
          stroke={hovered ? '#e5e5e5' : '#6b6b6b'}
          strokeWidth="1.5"
          style={{ transition: 'stroke 200ms' }}
        />
        <path
          d="M18 10L12 16L18 22"
          stroke={hovered ? '#e5e5e5' : '#6b6b6b'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke 200ms' }}
        />
      </svg>
    </button>
  )
}

export default BackButton
