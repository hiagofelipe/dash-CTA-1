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
      <div style={{ color: '#888888', marginBottom: 2, fontSize: 11 }}>{payload[0].payload.label}</div>
      <div style={{ fontWeight: 600 }}>{payload[0].value}</div>
    </div>
  )
}

const HBarChart = ({ data, accentColor }) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 4, right: 48, left: 0, bottom: 4 }}
      barSize={14}
    >
      <CartesianGrid horizontal={false} stroke="#2a2a2a" strokeDasharray="3 3" />
      <XAxis
        type="number"
        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fill: '#555555' }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        type="category"
        dataKey="label"
        width={190}
        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fill: '#888888' }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
      <Bar dataKey="value" fill={accentColor} radius={[0, 3, 3, 0]} animationDuration={800}>
        <LabelList
          dataKey="value"
          position="right"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, fill: '#f0f0f0' }}
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
)

export default HBarChart
