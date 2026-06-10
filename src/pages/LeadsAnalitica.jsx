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
import { formatNumber } from '../lib/utils'

const ACCENT = 'var(--analitica)'

const LeadsAnalitica = ({ onBack, data, startDate, endDate, onStartChange, onEndChange }) => {
  const total   = data?.total ?? 0
  const modulos = data?.por_modulo ?? []
  const mensal  = data?.por_mes ?? []
  const ofertas = data?.por_oferta ?? []

  const recorde  = mensal.reduce((max, m) => (m.value > (max?.value ?? 0) ? m : max), null)
  const topOferta = ofertas[0]
  const pctTop   = total > 0 && topOferta ? Math.round((topOferta.qtd / total) * 100) : 0

  const kpis = [
    { label: 'TOTAL DE LEADS',  value: formatNumber(total) },
    { label: 'MÓDULOS ATIVOS',  value: String(modulos.length) },
    { label: 'MÊS RECORDE',     value: recorde?.mes ?? '-', extra: recorde ? `${formatNumber(recorde.value)} leads` : '' },
    { label: 'PLANO DOMINANTE', value: topOferta?.nome ?? '-', extra: `${pctTop}% dos leads` },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Header
        logo={<LogoAnalitica height={32} />}
        accentLabel="ANALÍTICA"
        title="Quantidade de Leads — Analítica"
        startDate={startDate}
        endDate={endDate}
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />

      <main style={{ paddingBottom: 80 }}>
        <HeroSection
          accentColor={ACCENT}
          titleBefore="Quantidade de"
          titleAccent="leads"
          titleAfter="Analítica"
          description="Este painel mostra os leads captados para a AUVP Analítica. O gráfico de módulos mostra em qual aula do programa o lead foi gerado — o que indica quais conteúdos têm maior poder de captação."
        />

        <KpiRow kpis={kpis} accentColor={ACCENT} />

        <ExplainerCard text="O gráfico de módulos mostra em qual aula do programa o lead foi gerado — o que indica quais conteúdos têm maior poder de captação. A tabela de ofertas mostra quais planos tiveram mais interesse no período selecionado." />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          padding: '16px 40px 0',
        }}>
          <ChartCard
            title="Módulo da Aula"
            subtitle="Leads por módulo de origem"
            accentColor={ACCENT}
          >
            <HBarChart data={modulos} accentColor="var(--analitica)" />
          </ChartCard>

          <ChartCard
            title="Evolução Mensal"
            subtitle="Volume de leads por mês"
            accentColor={ACCENT}
          >
            <VBarChart data={mensal} accentColor="var(--analitica)" barSize={10} />
          </ChartCard>
        </div>

        <RankingSection
          title="Ofertas"
          subtitle="Leads por plano de interesse"
          items={ofertas}
          accentColor={ACCENT}
          rankLabel="OFERTA"
        />
      </main>

      <BackButton onBack={onBack} />
    </div>
  )
}

export default LeadsAnalitica
