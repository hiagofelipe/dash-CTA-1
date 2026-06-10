import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import KpiRow from '../components/KpiRow'
import ExplainerCard from '../components/ExplainerCard'
import ChartCard from '../components/ChartCard'
import VBarChart from '../components/VBarChart'
import BackButton from '../components/BackButton'
import LogoCapital from '../components/logos/LogoCapital'
import { formatNumber } from '../lib/utils'

const ACCENT = 'var(--capital)'

const ConversoesConsultoria = ({ onBack, data, startDate, endDate, onStartChange, onEndChange }) => {
  if (!data) return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: 'var(--bg)',
    }}>
      <span style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
        carregando conversões...
      </span>
    </div>
  )

  if (data.error) return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: 'var(--bg)', gap: 12,
    }}>
      <span style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
        erro ao carregar dados do Salesforce
      </span>
      <span style={{ color: 'var(--text-dim)', fontFamily: 'Inter, sans-serif', fontSize: 12, maxWidth: 480, textAlign: 'center' }}>
        {data.error}
      </span>
      <BackButton onBack={onBack} />
    </div>
  )

  const total  = data.total ?? 0
  const mensal = data.por_mes ?? []
  const anual  = data.por_ano ?? []

  const recorde     = mensal.reduce((max, m) => (m.value > (max?.value ?? 0) ? m : max), null)
  const anoRecorde  = anual.reduce((max, a) => (a.value > (max?.value ?? 0) ? a : max), null)
  const mesesAtivos = mensal.filter(m => m.value > 0).length

  const kpis = [
    { label: 'TOTAL DE CONVERSÕES', value: formatNumber(total) },
    { label: 'MÊS RECORDE',         value: recorde?.mes ?? '-',    extra: recorde    ? `${formatNumber(recorde.value)} conversões`    : '' },
    { label: 'ANO MAIS FORTE',      value: anoRecorde?.mes ?? '-', extra: anoRecorde ? `${formatNumber(anoRecorde.value)} conversões` : '' },
    { label: 'MESES ATIVOS',        value: String(mesesAtivos) },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Header
        logo={<LogoCapital height={32} />}
        accentLabel="CAPITAL"
        title="Quantidade de Conversões — Consultoria"
        startDate={startDate}
        endDate={endDate}
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />

      <main style={{ paddingBottom: 80 }}>
        <HeroSection
          accentColor={ACCENT}
          titleBefore="Quantidade de"
          titleAccent="conversões"
          titleAfter="efetivas"
          description="Este painel mostra as conversões efetivas da Consultoria AUVP Capital — leads que fecharam negócio. Os dados são extraídos em tempo real do Salesforce."
        />

        <KpiRow kpis={kpis} accentColor={ACCENT} />

        <ExplainerCard text="O gráfico mensal mostra a evolução de fechamentos mês a mês ao longo de todo o período. O gráfico anual permite comparar o volume total de conversões entre os anos." />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          padding: '16px 40px 0',
        }}>
          <ChartCard
            title="Evolução Mensal"
            subtitle="Volume de conversões por mês"
            accentColor={ACCENT}
          >
            <VBarChart data={mensal} accentColor="var(--capital)" barSize={10} />
          </ChartCard>

          <ChartCard
            title="Conversões por Ano"
            subtitle="Total de fechamentos por ano"
            accentColor={ACCENT}
          >
            <VBarChart data={anual} accentColor="var(--capital)" barSize={72} />
          </ChartCard>
        </div>
      </main>

      <BackButton onBack={onBack} />
    </div>
  )
}

export default ConversoesConsultoria
