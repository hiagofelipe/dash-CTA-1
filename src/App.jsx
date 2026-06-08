import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import NavHome from './components/NavHome'
import LeadsConsultoria from './pages/LeadsConsultoria'
import ConversoesConsultoria from './pages/ConversoesConsultoria'
import LeadsAnalitica from './pages/LeadsAnalitica'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [ctaData, setCtaData] = useState(null)
  const [loading, setLoading] = useState(true)
  const goHome = () => setCurrentPage('home')

  useEffect(() => {
    supabase.rpc('get_cta_data').then(({ data, error }) => {
      if (!error && data) setCtaData(data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'var(--bg)',
    }}>
      <span style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
        carregando...
      </span>
    </div>
  )

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {currentPage === 'home' && <NavHome setCurrentPage={setCurrentPage} ctaData={ctaData} />}
      {currentPage === 'leads-consultoria' && (
        <LeadsConsultoria onBack={goHome} data={ctaData?.leads_consultoria} />
      )}
      {currentPage === 'conversoes-consultoria' && (
        <ConversoesConsultoria onBack={goHome} />
      )}
      {currentPage === 'leads-analitica' && (
        <LeadsAnalitica onBack={goHome} data={ctaData?.leads_analitica} />
      )}
    </div>
  )
}

export default App
