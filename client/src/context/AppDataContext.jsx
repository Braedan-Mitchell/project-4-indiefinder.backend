import { createContext, useContext } from 'react'

const AppDataContext = createContext(null)

export function AppDataProvider({ children, value = null }) {
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  return useContext(AppDataContext)
}
