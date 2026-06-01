import Header from '../components/Header'
import KpiCard from '../components/KpiCard'
import DataTable from '../components/DataTable'
import BarChartCard from '../components/BarChartCard'
import HBarChartCard from '../components/HBarChartCard'
import BackButton from '../components/BackButton'
import LogoCapital from '../components/logos/LogoCapital'
import {
  leadsConsultoriaPatrimonio,
  leadsConsultoriaMes,
  leadsConsultoriaCampanha,
} from '../data/staticData'

const LeadsConsultoria = ({ onBack }) => {
  return (
    <div className="fade-in-up" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Header
        logo={<LogoCapital height={40} />}
        title="QUANTIDADE DE LEADS — Consultoria"
        accentColor="#2d6a47"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          gap: '24px',
          padding: '32px 40px',
          paddingBottom: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <HBarChartCard
            title="Quantidade por Patrimônio Investido"
            data={leadsConsultoriaPatrimonio}
            color="#2d6a47"
            tooltipBorderColor="#2d6a47"
          />
          <BarChartCard
            title="Quantidade por Mês"
            data={leadsConsultoriaMes}
            color="#2d6a47"
            xKey="mes"
            tooltipBorderColor="#2d6a47"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <KpiCard value={70} />
          <DataTable
            rows={leadsConsultoriaCampanha}
            colLabel="Campanha"
            accentColor="#2d6a47"
          />
        </div>
      </div>

      <BackButton onBack={onBack} />
    </div>
  )
}

export default LeadsConsultoria
