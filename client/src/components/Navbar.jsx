import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar({ isTransitioning, onNavigateWithTransition }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('indiefind-theme') === 'dark')

  const closeMenu = () => setIsOpen(false)
  const closeSettings = () => setIsSettingsOpen(false)

  useEffect(() => {
    document.body.style.overflow = isSettingsOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isSettingsOpen])

  useEffect(() => {
    const rootElement = document.documentElement
    rootElement.classList.toggle('theme-dark', isDarkMode)
    document.body.classList.remove('theme-dark')
    localStorage.setItem('indiefind-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const handleNavigation = (event, path) => {
    if (isTransitioning) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    closeMenu()
    closeSettings()
    onNavigateWithTransition(path)
  }

  return (
    <>
      <nav className="site-nav">
        <div className="site-nav__inner">
          <NavLink
            className="site-nav__brand"
            to="/"
            end
            onClick={event => handleNavigation(event, '/')}
          >
            <span className="site-nav__brand-wordmark" aria-label="indiefinder">
              <span className="site-nav__i-accent">&#x131;</span>
              <span>ND</span>
              <span className="site-nav__i-accent">&#x131;</span>
              <span>EF</span>
              <span className="site-nav__i-accent">&#x131;</span>
              <span>NDER</span>
            </span>
          </NavLink>

          <button
            className="site-nav__settings-toggle"
            aria-label="Open settings"
            aria-controls="settings-sidebar"
            aria-expanded={isSettingsOpen}
            onClick={() => setIsSettingsOpen(previousState => !previousState)}
          >
            ⚙
          </button>

          <button
            className="site-nav__toggle"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(previousState => !previousState)}
          >
            ☰
          </button>

          <div className={`site-nav__links ${isOpen ? 'is-open' : ''}`}>
            <NavLink className="site-nav__link" to="/" end onClick={event => handleNavigation(event, '/')}>Home</NavLink>
            <NavLink className="site-nav__link" to="/games" onClick={event => handleNavigation(event, '/games')}>Games</NavLink>
            <NavLink className="site-nav__link" to="/about" onClick={event => handleNavigation(event, '/about')}>About</NavLink>
            <NavLink className="site-nav__link" to="/contact" onClick={event => handleNavigation(event, '/contact')}>Contact</NavLink>
          </div>
        </div>
      </nav>

      <div
        className={`site-nav__settings-backdrop ${isSettingsOpen ? 'is-open' : ''}`}
        onClick={closeSettings}
        aria-hidden="true"
      />

      <aside
        id="settings-sidebar"
        className={`site-nav__settings-panel ${isSettingsOpen ? 'is-open' : ''}`}
        aria-hidden={!isSettingsOpen}
      >
        <div className="site-nav__settings-header">
          <h2>Settings</h2>
          <button
            className="site-nav__settings-close"
            aria-label="Close settings"
            onClick={closeSettings}
          >
            ×
          </button>
        </div>
        <p className="site-nav__settings-placeholder">
          Pick your preferences below.
        </p>
        <div className="site-nav__setting-row">
          <div>
            <p className="site-nav__setting-title">Dark Mode</p>
          </div>
          <button
            type="button"
            className={`site-nav__switch ${isDarkMode ? 'is-on' : ''}`}
            role="switch"
            aria-checked={isDarkMode}
            aria-label="Toggle dark mode"
            onClick={() => setIsDarkMode(previousState => !previousState)}
          >
            <span className="site-nav__switch-thumb" />
          </button>
        </div>
      </aside>
    </>
  )
}

export default Navbar
