import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import RankingChart from '../components/RankingChart'
import MonthlyChart from '../components/MonthlyChart'
import BackButton from '../components/BackButton'
import LogoCapital from '../components/logos/LogoCapital'
import { leadsConsultoria } from '../data/staticData'

const ACCENT = '#00c875'

const LeadsConsultoria = ({ onBack }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#030405' }}>
    <Header
      logo={<LogoCapital height={36} />}
      title="Quantidade de Leads — Consultoria"
    />

    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Sidebar
        total={leadsConsultoria.total}
        typeLabel="LEADS"
        rankLabel="CAMPANHA"
        items={leadsConsultoria.campanhas}
        accentColor={ACCENT}
      />

      <div style={{
        flex: 1,
        padding: '32px 40px',
        display: 'flex',
        gap: 24,
        overflowY: 'auto',
        alignItems: 'flex-start',
      }}>
        <RankingChart
          title="Patrimonio Investido"
          data={leadsConsultoria.patrimonio}
          accentColor={ACCENT}
        />
        <MonthlyChart
          title="Evolucao Mensal"
          data={leadsConsultoria.mensal}
          accentColor={ACCENT}
          gradientId="grad-leads-c"
        />
      </div>
    </div>

    <BackButton onBack={onBack} />
  </div>
)

export default LeadsConsultoria
