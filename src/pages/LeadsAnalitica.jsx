import Header from '../components/Header'
import KpiCard from '../components/KpiCard'
import DataTable from '../components/DataTable'
import BarChartCard from '../components/BarChartCard'
import HBarChartCard from '../components/HBarChartCard'
import BackButton from '../components/BackButton'
import LogoAnalitica from '../components/logos/LogoAnalitica'
import {
  leadsAnaliticaModulo,
  leadsAnaliticaMes,
  leadsAnaliticaOferta,
} from '../data/staticData'

const LeadsAnalitica = ({ onBack }) => {
  return (
    <div className="fade-in-up" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Header
        logo={<LogoAnalitica height={40} />}
        title="QUANTIDADE DE LEADS — Analítica"
        accentColor="#2563a8"
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
            title="Quantidade por Módulo da Aula"
            data={leadsAnaliticaModulo}
            color="#2563a8"
            tooltipBorderColor="#2563a8"
          />
          <BarChartCard
            title="Quantidade por Mês"
            data={leadsAnaliticaMes}
            color="#2563a8"
            xKey="mes"
            tooltipBorderColor="#2563a8"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <KpiCard value={39} />
          <DataTable
            rows={leadsAnaliticaOferta}
            colLabel="Oferta"
            accentColor="#2563a8"
          />
        </div>
      </div>

      <BackButton onBack={onBack} />
    </div>
  )
}

export default LeadsAnalitica
