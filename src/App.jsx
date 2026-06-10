import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import NavHome from './components/NavHome'
import LeadsConsultoria from './pages/LeadsConsultoria'
import ConversoesConsultoria from './pages/ConversoesConsultoria'
import LeadsAnalitica from './pages/LeadsAnalitica'

const TODAY = new Date().toISOString().split('T')[0]

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [ctaData, setCtaData] = useState(null)
  const [conversoesData, setConversoesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState('2021-01-01')
  const [endDate, setEndDate] = useState(TODAY)
  const goHome = () => setCurrentPage('home')

  useEffect(() => {
    // Supabase: desbloqueie a UI assim que responder
    supabase.rpc('get_cta_data', { p_start: startDate, p_end: endDate })
      .then(({ data, error }) => {
        if (!error && data) setCtaData(data)
        setLoading(false)
      })
    // Salesforce: roda em paralelo, atualiza conversões quando chegar
    supabase.functions.invoke('salesforce-conversoes', { body: { startDate, endDate } })
      .then(({ data, error }) => {
        if (!error && data) setConversoesData(data)
      })
  }, [startDate, endDate])

  const dateProps = {
    startDate,
    endDate,
    onStartChange: setStartDate,
    onEndChange:   setEndDate,
  }

  if (loading) return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: 'var(--bg)',
    }}>
      <span style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
        carregando...
      </span>
    </div>
  )

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {currentPage === 'home' && (
        <NavHome
          setCurrentPage={setCurrentPage}
          ctaData={ctaData}
          totalConversoes={conversoesData?.total ?? null}
        />
      )}
      {currentPage === 'leads-consultoria' && (
        <LeadsConsultoria onBack={goHome} data={ctaData?.leads_consultoria} {...dateProps} />
      )}
      {currentPage === 'conversoes-consultoria' && (
        <ConversoesConsultoria onBack={goHome} data={conversoesData} {...dateProps} />
      )}
      {currentPage === 'leads-analitica' && (
        <LeadsAnalitica onBack={goHome} data={ctaData?.leads_analitica} {...dateProps} />
      )}
    </div>
  )
}

export default App
