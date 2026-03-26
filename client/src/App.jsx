import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './styles/base.css'
import './components/BackgroundOrbs.css'
import './components/RouteTransitionOverlay.css'
import BackgroundOrbs from './components/BackgroundOrbs'
import Navbar from './components/Navbar'
import RouteTransitionOverlay from './components/RouteTransitionOverlay'
import {
  COVER_DURATION_MS,
  HOLD_DURATION_MS,
  REVEAL_DURATION_MS,
} from './constants/transitions'
import Home from './pages/Home'
import Games from './pages/Games'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [transitionStage, setTransitionStage] = useState('idle')
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
    timersRef.current = []
  }

  const startTransitionNavigation = targetPath => {
    if (transitionStage !== 'idle' || targetPath === location.pathname) {
      return
    }

    clearTimers()
    setTransitionStage('cover')

    const coverTimerId = setTimeout(() => {
      navigate(targetPath)
      setTransitionStage('hold')

      const holdTimerId = setTimeout(() => {
        setTransitionStage('reveal')

        const revealTimerId = setTimeout(() => {
          setTransitionStage('idle')
          clearTimers()
        }, REVEAL_DURATION_MS)

        timersRef.current.push(revealTimerId)
      }, HOLD_DURATION_MS)

      timersRef.current.push(holdTimerId)
    }, COVER_DURATION_MS)

    timersRef.current.push(coverTimerId)
  }

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [])

  return (
    <div className="app-shell">
      <BackgroundOrbs />
      <RouteTransitionOverlay stage={transitionStage} />
      <Navbar onNavigateWithTransition={startTransitionNavigation} isTransitioning={transitionStage !== 'idle'} />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
