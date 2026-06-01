import Header from '../components/Header'
import KpiCard from '../components/KpiCard'
import DataTable from '../components/DataTable'
import BarChartCard from '../components/BarChartCard'
import HBarChartCard from '../components/HBarChartCard'
import BackButton from '../components/BackButton'
import LogoCapital from '../components/logos/LogoCapital'
import {
  conversoesConsultoriaMes,
  conversoesConsultoriaPatrimonio,
  conversoesConsultoriaCampanha,
} from '../data/staticData'

const ConversoesConsultoria = ({ onBack }) => {
  return (
    <div className="fade-in-up" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Header
        logo={<LogoCapital height={40} />}
        title="QUANTIDADE DE CONVERSÕES — Consultoria"
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
          <BarChartCard
            title="Ganhos da AUVP Escola"
            data={conversoesConsultoriaMes}
            color="#2d6a47"
            xKey="mes"
            tooltipBorderColor="#2d6a47"
          />
          <HBarChartCard
            title="Ganhos da AUVP Escola"
            data={conversoesConsultoriaPatrimonio}
            color="#2d6a47"
            tooltipBorderColor="#2d6a47"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <KpiCard value={8} />
          <DataTable
            rows={conversoesConsultoriaCampanha}
            colLabel="Campanha"
            accentColor="#2d6a47"
          />
        </div>
      </div>

      <BackButton onBack={onBack} />
    </div>
  )
}

export default ConversoesConsultoria
