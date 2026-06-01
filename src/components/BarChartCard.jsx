import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts'

const BarChartCard = ({ title, data, color, xKey = 'mes', tooltipBorderColor }) => {
  const tooltipBorder = tooltipBorderColor || color

  return (
    <div
      style={{
        background: '#111111',
        border: '1px solid #1f1f1f',
        padding: '20px 24px 16px',
      }}
    >
      <div
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 300,
          fontSize: '11px',
          color: '#6b6b6b',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '16px',
        }}
      >
        {title}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#1f1f1f" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: '#555', fontSize: 11, fontFamily: 'Outfit, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#555', fontSize: 11, fontFamily: 'Outfit, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1a1a1a',
              border: `1px solid ${tooltipBorder}`,
              borderRadius: 0,
              fontFamily: 'Outfit, sans-serif',
              color: '#ffffff',
              fontSize: '12px',
            }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar
            dataKey="value"
            fill={color}
            animationBegin={0}
            animationDuration={800}
            radius={[2, 2, 0, 0]}
          >
            <LabelList
              dataKey="value"
              position="top"
              style={{ fill: '#e5e5e5', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartCard
