const ExplainerCard = ({ text }) => (
  <div style={{
    margin: '0 40px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '20px 24px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  }}>
    {text}
  </div>
)

export default ExplainerCard
