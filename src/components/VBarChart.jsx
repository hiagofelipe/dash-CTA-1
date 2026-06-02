import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, LabelList, ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#222222',
      border: '1px solid #333333',
      borderRadius: 8,
      padding: '8px 12px',
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      color: '#f0f0f0',
    }}>
      <div style={{ color: '#888888', marginBottom: 2, fontSize: 11 }}>{payload[0].payload.mes}</div>
      <div style={{ fontWeight: 600 }}>{payload[0].value}</div>
    </div>
  )
}

const VBarChart = ({ data, accentColor }) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart
      data={data}
      margin={{ top: 24, right: 8, left: 0, bottom: 4 }}
      barSize={44}
    >
      <CartesianGrid vertical={false} stroke="#2a2a2a" strokeDasharray="3 3" />
      <XAxis
        dataKey="mes"
        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fill: '#888888' }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fill: '#555555' }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
      <Bar dataKey="value" fill={accentColor} radius={[4, 4, 0, 0]} animationDuration={800}>
        <LabelList
          dataKey="value"
          position="top"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, fill: '#f0f0f0' }}
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
)

export default VBarChart
