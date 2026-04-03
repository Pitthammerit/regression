import { createContext, useState, useContext, useCallback } from 'react'

const MediaContext = createContext(null)

/**
 * MediaProvider - Coordinates all media players for mutual exclusion
 *
 * Only one media player (video/audio) can play at a time.
 * Players register on mount, unregister on unmount.
 * When a player requests to play, all others are paused.
 */
export function MediaProvider({ children }) {
  const [players, setPlayers] = useState(new Map())

  const registerPlayer = useCallback((id, onPause) => {
    setPlayers(prev => new Map(prev).set(id, onPause))
  }, [])

  const unregisterPlayer = useCallback((id) => {
    setPlayers(prev => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }, [])

  const requestPlay = useCallback((id) => {
    setPlayers(prev => {
      // Pause all other players
      prev.forEach((onPause, playerId) => {
        if (playerId !== id) {
          onPause()
        }
      })
      return prev // No actual state change, just side effect
    })
  }, [])

  return (
    <MediaContext.Provider value={{ registerPlayer, unregisterPlayer, requestPlay }}>
      {children}
    </MediaContext.Provider>
  )
}

/**
 * useMedia Hook
 *
 * Provides access to media coordination functions
 *
 * @returns {Object} { registerPlayer, unregisterPlayer, requestPlay }
 */
export function useMedia() {
  const context = useContext(MediaContext)
  if (!context) throw new Error('useMedia must be used within MediaProvider')
  return context
}
