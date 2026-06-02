const HeroSection = ({ accentColor, titleBefore, titleAccent, titleAfter, description }) => (
  <section style={{ padding: '40px 40px 0' }}>
    <div style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: accentColor,
      marginBottom: 12,
    }}>
      DASHBOARD
    </div>
    <h1 style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: 800,
      fontSize: 36,
      color: 'var(--text)',
      lineHeight: 1.1,
      marginBottom: 12,
    }}>
      {titleBefore}{' '}
      <span style={{ color: accentColor }}>{titleAccent}</span>
      {titleAfter ? ` ${titleAfter}` : ''}
    </h1>
    <p style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      fontSize: 14,
      color: 'var(--text-muted)',
      maxWidth: 520,
      lineHeight: 1.6,
    }}>
      {description}
    </p>
  </section>
)

export default HeroSection
