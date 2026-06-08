import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import KpiRow from '../components/KpiRow'
import ExplainerCard from '../components/ExplainerCard'
import ChartCard from '../components/ChartCard'
import HBarChart from '../components/HBarChart'
import VBarChart from '../components/VBarChart'
import BackButton from '../components/BackButton'
import LogoCapital from '../components/logos/LogoCapital'

const ACCENT = 'var(--capital)'

const LeadsConsultoria = ({ onBack, data }) => {
  const total = data?.total ?? 0
  const patrimonio = data?.por_patrimonio ?? []
  const mensal = data?.por_mes ?? []

  const dominante = patrimonio[0]
  const recorde = mensal.reduce((max, m) => (m.value > (max?.value ?? 0) ? m : max), null)
  const pctDominante = total > 0 && dominante ? Math.round((dominante.value / total) * 100) : 0

  const kpis = [
    { label: 'TOTAL DE LEADS', value: total.toLocaleString('pt-BR') },
    { label: 'PERFIS DE PATRIMONIO', value: String(patrimonio.length) },
    { label: 'MES RECORDE', value: recorde?.mes ?? '-', extra: recorde ? `${recorde.value} leads` : '' },
    { label: 'PERFIL DOMINANTE', value: dominante?.label ?? '-', extra: `${pctDominante}% dos leads` },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Header
        logo={<LogoCapital height={32} />}
        accentLabel="CAPITAL"
        title="Quantidade de Leads — Consultoria"
      />

      <main style={{ paddingBottom: 80 }}>
        <HeroSection
          accentColor={ACCENT}
          titleBefore="Quantidade de"
          titleAccent="leads"
          titleAfter="captados"
          description="Este painel mostra os leads captados para a Consultoria AUVP Capital. Cada lead representa uma pessoa que demonstrou interesse mas ainda nao converteu. O grafico de patrimonio mostra o perfil financeiro declarado dos leads — util para entender o publico que o CTA esta alcancando."
        />

        <KpiRow kpis={kpis} accentColor={ACCENT} />

        <ExplainerCard text="O grafico de patrimonio mostra o perfil financeiro declarado dos leads — util para entender o publico que o CTA esta alcancando. O grafico mensal mostra o volume de captacao ao longo do tempo por campanha de origem." />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          padding: '16px 40px 0',
        }}>
          <ChartCard
            title="Patrimonio Investido"
            subtitle="Distribuicao por faixa de patrimonio declarado"
            accentColor={ACCENT}
          >
            <HBarChart data={patrimonio} accentColor="var(--capital)" />
          </ChartCard>

          <ChartCard
            title="Evolucao Mensal"
            subtitle="Volume de leads por mes"
            accentColor={ACCENT}
          >
            <VBarChart data={mensal} accentColor="var(--capital)" />
          </ChartCard>
        </div>
      </main>

      <BackButton onBack={onBack} />
    </div>
  )
}

export default LeadsConsultoria
