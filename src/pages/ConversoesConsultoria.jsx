import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import KpiRow from '../components/KpiRow'
import ExplainerCard from '../components/ExplainerCard'
import ChartCard from '../components/ChartCard'
import HBarChart from '../components/HBarChart'
import VBarChart from '../components/VBarChart'
import RankingSection from '../components/RankingSection'
import BackButton from '../components/BackButton'
import LogoCapital from '../components/logos/LogoCapital'
import { conversoesConsultoria } from '../data/staticData'

const ACCENT = 'var(--capital)'

const kpis = [
  { label: 'TOTAL DE CONVERSOES', value: '8' },
  { label: 'TAXA DE CONVERSAO', value: '11,4%', extra: 'sobre 70 leads' },
  { label: 'CAMPANHAS', value: '2' },
  { label: 'PERFIL DOMINANTE', value: '(Em branco)', extra: '37,5% das conversoes' },
]

const ConversoesConsultoria = ({ onBack }) => (
  <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
    <Header
      logo={<LogoCapital height={32} />}
      accentLabel="CAPITAL"
      title="Quantidade de Conversoes — Consultoria"
    />

    <main style={{ paddingBottom: 80 }}>
      <HeroSection
        accentColor={ACCENT}
        titleBefore="Quantidade de"
        titleAccent="conversoes"
        titleAfter="efetivas"
        description="Este painel mostra as conversoes efetivas — leads que se tornaram clientes da Consultoria AUVP Capital. A taxa de conversao e calculada sobre o total de leads captados no mesmo periodo."
      />

      <KpiRow kpis={kpis} accentColor={ACCENT} />

      <ExplainerCard text="O grafico de patrimonio mostra o perfil dos clientes que efetivamente compraram, que pode diferir do perfil de quem apenas demonstrou interesse. O grafico mensal indica o ritmo de fechamentos ao longo do periodo analisado." />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: '16px 40px 0',
      }}>
        <ChartCard
          title="Ganhos por Mes"
          subtitle="Volume de conversoes por mes"
          accentColor={ACCENT}
        >
          <VBarChart data={conversoesConsultoria.mensal} accentColor="var(--capital)" />
        </ChartCard>

        <ChartCard
          title="Ganhos por Patrimonio"
          subtitle="Perfil de patrimonio dos convertidos"
          accentColor={ACCENT}
        >
          <HBarChart data={conversoesConsultoria.patrimonio} accentColor="var(--capital)" />
        </ChartCard>
      </div>

      <RankingSection
        title="Campanhas"
        subtitle="Conversoes por campanha de origem"
        items={conversoesConsultoria.campanhas}
        accentColor={ACCENT}
        rankLabel="CAMPANHA"
      />
    </main>

    <BackButton onBack={onBack} />
  </div>
)

export default ConversoesConsultoria
