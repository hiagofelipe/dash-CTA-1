import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import KpiRow from '../components/KpiRow'
import ExplainerCard from '../components/ExplainerCard'
import ChartCard from '../components/ChartCard'
import HBarChart from '../components/HBarChart'
import VBarChart from '../components/VBarChart'
import RankingSection from '../components/RankingSection'
import BackButton from '../components/BackButton'
import LogoAnalitica from '../components/logos/LogoAnalitica'
import { leadsAnalitica } from '../data/staticData'

const ACCENT = 'var(--analitica)'

const kpis = [
  { label: 'TOTAL DE LEADS', value: '39' },
  { label: 'MODULOS ATIVOS', value: '4' },
  { label: 'MES RECORDE', value: 'abril', extra: '23 leads' },
  { label: 'PLANO DOMINANTE', value: 'Trial 14 dias', extra: '82% dos leads' },
]

const LeadsAnalitica = ({ onBack }) => (
  <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
    <Header
      logo={<LogoAnalitica height={32} />}
      accentLabel="ANALITICA"
      title="Quantidade de Leads — Analitica"
    />

    <main style={{ paddingBottom: 80 }}>
      <HeroSection
        accentColor={ACCENT}
        titleBefore="Quantidade de"
        titleAccent="leads"
        titleAfter="Analitica"
        description="Este painel mostra os leads captados para a AUVP Analitica. O grafico de modulos mostra em qual aula do programa o lead foi gerado — o que indica quais conteudos tem maior poder de captacao."
      />

      <KpiRow kpis={kpis} accentColor={ACCENT} />

      <ExplainerCard text="O grafico de modulos mostra em qual aula do programa o lead foi gerado — o que indica quais conteudos tem maior poder de captacao. A tabela de ofertas mostra quais planos tiveram mais interesse no periodo selecionado." />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: '16px 40px 0',
      }}>
        <ChartCard
          title="Modulo da Aula"
          subtitle="Leads por modulo de origem"
          accentColor={ACCENT}
        >
          <HBarChart data={leadsAnalitica.modulos} accentColor="var(--analitica)" />
        </ChartCard>

        <ChartCard
          title="Evolucao Mensal"
          subtitle="Volume de leads por mes"
          accentColor={ACCENT}
        >
          <VBarChart data={leadsAnalitica.mensal} accentColor="var(--analitica)" />
        </ChartCard>
      </div>

      <RankingSection
        title="Ofertas"
        subtitle="Leads por plano de interesse"
        items={leadsAnalitica.ofertas}
        accentColor={ACCENT}
        rankLabel="OFERTA"
      />
    </main>

    <BackButton onBack={onBack} />
  </div>
)

export default LeadsAnalitica
