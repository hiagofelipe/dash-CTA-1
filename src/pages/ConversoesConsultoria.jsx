import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import RankingChart from '../components/RankingChart'
import MonthlyChart from '../components/MonthlyChart'
import BackButton from '../components/BackButton'
import LogoCapital from '../components/logos/LogoCapital'
import { conversoesConsultoria } from '../data/staticData'

const ACCENT = '#00c875'

const ConversoesConsultoria = ({ onBack }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#030405' }}>
    <Header
      logo={<LogoCapital height={36} />}
      title="Quantidade de Conversoes — Consultoria"
    />

    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Sidebar
        total={conversoesConsultoria.total}
        typeLabel="CONVERSOES"
        rankLabel="CAMPANHA"
        items={conversoesConsultoria.campanhas}
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
        <MonthlyChart
          title="Ganhos por Mes"
          data={conversoesConsultoria.mensal}
          accentColor={ACCENT}
          gradientId="grad-conv-c-mes"
        />
        <RankingChart
          title="Ganhos por Patrimonio"
          data={conversoesConsultoria.patrimonio}
          accentColor={ACCENT}
        />
      </div>
    </div>

    <BackButton onBack={onBack} />
  </div>
)

export default ConversoesConsultoria
