import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NavHome from './components/NavHome'
import LeadsConsultoria from './pages/LeadsConsultoria'
import ConversoesConsultoria from './pages/ConversoesConsultoria'
import LeadsAnalitica from './pages/LeadsAnalitica'

const GRAIN = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg=='

const pageTransition = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit:    { opacity: 0, filter: 'blur(4px)' },
  transition: { duration: 0.3, ease: 'easeOut' },
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const goHome = () => setCurrentPage('home')

  const pages = {
    'home':                    <NavHome setCurrentPage={setCurrentPage} />,
    'leads-consultoria':       <LeadsConsultoria onBack={goHome} />,
    'conversoes-consultoria':  <ConversoesConsultoria onBack={goHome} />,
    'leads-analitica':         <LeadsAnalitica onBack={goHome} />,
  }

  return (
    <div style={{ background: '#030405', minHeight: '100vh', position: 'relative' }}>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("${GRAIN}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          opacity: 0.025,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
          style={{ minHeight: '100vh' }}
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
