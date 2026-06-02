import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LabelList, ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#0f1117',
      border: '1px solid rgba(255,255,255,0.12)',
      padding: '10px 14px',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 12,
      color: '#ececec',
    }}>
      <div style={{ color: '#4a4f5c', marginBottom: 4, fontSize: 10 }}>
        {payload[0].payload.mes}
      </div>
      <div>{payload[0].value}</div>
    </div>
  )
}

const CustomXTick = ({ x, y, payload }) => (
  <text
    x={x}
    y={y + 16}
    textAnchor="middle"
    fontFamily="'IBM Plex Mono', monospace"
    fontSize={10}
    fill="#4a4f5c"
  >
    {payload.value}
  </text>
)

const MonthlyChart = ({ title, data, accentColor, gradientId }) => (
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

    <div style={{ flex: 1, minHeight: 220 }}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 28, right: 16, left: 16, bottom: 28 }} barSize={28}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity={1} />
              <stop offset="100%" stopColor={accentColor} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="transparent" />
          <XAxis
            dataKey="mes"
            tick={<CustomXTick />}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar
            dataKey="value"
            fill={`url(#${gradientId})`}
            animationDuration={1200}
            radius={[2, 2, 0, 0]}
          >
            <LabelList
              dataKey="value"
              position="top"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 18,
                fill: '#ececec',
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default MonthlyChart
