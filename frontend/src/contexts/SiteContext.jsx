import { createContext, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SiteContext = createContext(null)

const VALID_SITES = ['regression', 'reiki']  // NO podcast for now
const VALID_LANGUAGES = ['de', 'en']

/**
 * SiteProvider - Manages site and language state from URL params
 *
 * Single Source of Truth for:
 * - Current site (regression | reiki)
 * - Current language (de | en)
 * - Site navigation (navigateToSite)
 * - Language switching (switchLanguage)
 *
 * URL structure: /:site/:lang
 * Defaults: /regression/de
 */
export function SiteProvider({ children }) {
  const { site: siteParam, lang: langParam } = useParams()
  const navigate = useNavigate()

  // Validate and default to regression/de
  const site = VALID_SITES.includes(siteParam) ? siteParam : 'regression'
  const lang = VALID_LANGUAGES.includes(langParam) ? langParam : 'de'

  // Redirect invalid URLs
  useEffect(() => {
    if (!VALID_SITES.includes(siteParam) || !VALID_LANGUAGES.includes(langParam)) {
      navigate(`/${site}/${lang}`, { replace: true })
    }
  }, [siteParam, langParam, navigate, site, lang])

  const navigateToSite = (targetSite) => {
    if (!VALID_SITES.includes(targetSite)) return
    navigate(`/${targetSite}/${lang}`)
  }

  const switchLanguage = (newLang) => {
    if (!VALID_LANGUAGES.includes(newLang)) return
    navigate(`/${site}/${newLang}`)
  }

  return (
    <SiteContext.Provider value={{
      currentSite: site,
      currentLang: lang,
      navigateToSite,
      switchLanguage,
      validSites: VALID_SITES,
      validLanguages: VALID_LANGUAGES,
    }}>
      {children}
    </SiteContext.Provider>
  )
}

/**
 * useSite Hook
 *
 * Provides access to site and language state
 *
 * @returns {Object} { currentSite, currentLang, navigateToSite, switchLanguage, validSites, validLanguages }
 */
export function useSite() {
  const context = useContext(SiteContext)
  if (!context) throw new Error('useSite must be used within SiteProvider')
  return context
}
