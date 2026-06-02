import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import RankingChart from '../components/RankingChart'
import MonthlyChart from '../components/MonthlyChart'
import BackButton from '../components/BackButton'
import LogoAnalitica from '../components/logos/LogoAnalitica'
import { leadsAnalitica } from '../data/staticData'

const ACCENT = '#4d94ff'

const LeadsAnalitica = ({ onBack }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#030405' }}>
    <Header
      logo={<LogoAnalitica height={36} />}
      title="Quantidade de Leads — Analitica"
    />

    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Sidebar
        total={leadsAnalitica.total}
        typeLabel="LEADS"
        rankLabel="OFERTA"
        items={leadsAnalitica.ofertas}
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
          title="Modulo da Aula"
          data={leadsAnalitica.modulos}
          accentColor={ACCENT}
        />
        <MonthlyChart
          title="Evolucao Mensal"
          data={leadsAnalitica.mensal}
          accentColor={ACCENT}
          gradientId="grad-leads-a"
        />
      </div>
    </div>

    <BackButton onBack={onBack} />
  </div>
)

export default LeadsAnalitica
