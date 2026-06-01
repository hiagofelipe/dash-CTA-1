import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const HBarChartCard = ({ title, data, color, tooltipBorderColor }) => {
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
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 48, left: 8, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} stroke="#1f1f1f" />
          <XAxis
            type="number"
            tick={{ fill: '#555', fontSize: 11, fontFamily: 'Outfit, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={190}
            tick={{ fill: '#aaaaaa', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}
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
            radius={[0, 2, 2, 0]}
          >
            <LabelList
              dataKey="value"
              position="right"
              style={{ fill: '#e5e5e5', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HBarChartCard
