import { createContext, useContext } from 'react'

const CurrentContentContext = createContext<string | undefined>(undefined)
CurrentContentContext.displayName = "Foundation Spa React: Current Page"

export const CurrentContent = CurrentContentContext.Provider
export const useCurrentContent = () => useContext(CurrentContentContext)
export default useCurrentContent