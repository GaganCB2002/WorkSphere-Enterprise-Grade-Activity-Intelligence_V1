import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { ComingSoonModal } from './ComingSoonModal'

interface ComingSoonContextValue {
  openComingSoon: (featureName: string) => void
  closeComingSoon: () => void
}

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useComingSoon() {
  const ctx = useContext(ComingSoonContext)
  if (!ctx) throw new Error('useComingSoon must be used within ComingSoonProvider')
  return ctx
}

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; featureName: string }>({ open: false, featureName: '' })

  const openComingSoon = useCallback((featureName: string) => {
    setState({ open: true, featureName })
  }, [])

  const closeComingSoon = useCallback(() => {
    setState({ open: false, featureName: '' })
  }, [])

  return (
    <ComingSoonContext.Provider value={{ openComingSoon, closeComingSoon }}>
      {children}
      <ComingSoonModal
        open={state.open}
        onClose={closeComingSoon}
        featureName={state.featureName}
      />
    </ComingSoonContext.Provider>
  )
}
