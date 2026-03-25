import { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest, apiRoutes } from '../services/apiClient'

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  const [games, setGames] = useState([])
  const [isGamesLoading, setIsGamesLoading] = useState(true)
  const [gamesError, setGamesError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadGames() {
      try {
        setGamesError('')
        setIsGamesLoading(true)
        const gameList = await apiRequest(apiRoutes.games)

        if (isActive) {
          setGames(gameList)
        }
      } catch {
        if (isActive) {
          setGamesError('Could not load games from the API.')
        }
      } finally {
        if (isActive) {
          setIsGamesLoading(false)
        }
      }
    }

    loadGames()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <AppDataContext.Provider
      value={{
        games,
        isGamesLoading,
        gamesError,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(AppDataContext)

  if (!context) {
    throw new Error('useAppData must be used inside AppDataProvider.')
  }

  return context
}
