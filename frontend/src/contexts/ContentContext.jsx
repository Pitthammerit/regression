import { createContext, useContext, useState, useEffect } from 'react'
import { getContent } from '../content'
import { useSite } from './SiteContext'

const ContentContext = createContext(null)

/**
 * ContentProvider - Loads content based on current site and language
 *
 * Single Source of Truth for:
 * - Dynamic content loading (reacts to site/lang changes)
 * - Content distribution to all components
 *
 * Automatically reloads content when site or language changes via SiteContext
 */
export function ContentProvider({ children }) {
  const { currentSite, currentLang } = useSite()

  // Initialize with default content immediately (not null)
  const [content, setContent] = useState(() => getContent(currentSite, currentLang))

  useEffect(() => {
    const newContent = getContent(currentSite, currentLang)
    setContent(newContent)
  }, [currentSite, currentLang])

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}

/**
 * useContent Hook
 *
 * Provides access to current site content
 *
 * @returns {Object} Content object with all site content (header, footer, sections, etc.)
 */
export function useContent() {
  const context = useContext(ContentContext)
  if (context === null) throw new Error('useContent must be used within ContentProvider')
  return context
}
