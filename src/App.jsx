import { useState } from 'react'
import NavHome from './components/NavHome'
import LeadsConsultoria from './pages/LeadsConsultoria'
import ConversoesConsultoria from './pages/ConversoesConsultoria'
import LeadsAnalitica from './pages/LeadsAnalitica'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const goHome = () => setCurrentPage('home')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {currentPage === 'home' && <NavHome setCurrentPage={setCurrentPage} />}
      {currentPage === 'leads-consultoria' && <LeadsConsultoria onBack={goHome} />}
      {currentPage === 'conversoes-consultoria' && <ConversoesConsultoria onBack={goHome} />}
      {currentPage === 'leads-analitica' && <LeadsAnalitica onBack={goHome} />}
    </div>
  )
}

export default App
