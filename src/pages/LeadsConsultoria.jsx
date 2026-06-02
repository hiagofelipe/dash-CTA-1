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
import { leadsConsultoria } from '../data/staticData'

const ACCENT = 'var(--capital)'

const kpis = [
  { label: 'TOTAL DE LEADS', value: '70' },
  { label: 'CAMPANHAS ATIVAS', value: '3' },
  { label: 'MES RECORDE', value: 'marco', extra: '30 leads' },
  { label: 'PERFIL DOMINANTE', value: 'Ate R$299mil', extra: '67% dos leads' },
]

const LeadsConsultoria = ({ onBack }) => (
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
          <HBarChart data={leadsConsultoria.patrimonio} accentColor="var(--capital)" />
        </ChartCard>

        <ChartCard
          title="Evolucao Mensal"
          subtitle="Volume de leads por mes"
          accentColor={ACCENT}
        >
          <VBarChart data={leadsConsultoria.mensal} accentColor="var(--capital)" />
        </ChartCard>
      </div>

      <RankingSection
        title="Campanhas"
        subtitle="Origem dos leads por campanha"
        items={leadsConsultoria.campanhas}
        accentColor={ACCENT}
        rankLabel="CAMPANHA"
      />
    </main>

    <BackButton onBack={onBack} />
  </div>
)

export default LeadsConsultoria
