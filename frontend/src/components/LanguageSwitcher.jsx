import { useSite } from '../contexts/SiteContext'

/**
 * LanguageSwitcher - DE/EN language selector
 *
 * Compact button showing current language (DE or EN).
 * Click to toggle to the other language.
 * English is disabled until content exists (Phase 6).
 *
 * @param {string} className - Additional CSS classes
 * @param {boolean} compact - If true, shows as single circular button
 */
export default function LanguageSwitcher({ className = '', compact = false }) {
  const { currentLang, switchLanguage } = useSite()
  const displayLang = currentLang.toUpperCase()
  const otherLang = currentLang === 'de' ? 'en' : 'de'
  const isEnglishEnabled = false // TODO: Enable in Phase 6 when English content exists

  const handleSwitch = () => {
    if (currentLang === 'de') {
      switchLanguage('en')
    } else {
      switchLanguage('de')
    }
  }

  if (compact) {
    return (
      <button
        onClick={handleSwitch}
        disabled={currentLang === 'en' && !isEnglishEnabled}
        className={`flex items-center justify-center w-10 h-10 rounded-full border border-color-border-light bg-white hover:bg-color-bg-light transition-colors ${
          (currentLang === 'en' && !isEnglishEnabled) ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
        aria-label={`Switch to ${otherLang.toUpperCase()}`}
        title={`Current language: ${displayLang}. Click to switch to ${otherLang.toUpperCase()}`}
      >
        <span className="text-sm font-medium text-color-text">{displayLang}</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={currentLang === 'en' && !isEnglishEnabled}
      className={`px-3 py-1.5 rounded-full border border-color-border-light bg-white hover:bg-color-bg-light transition-colors ${
        (currentLang === 'en' && !isEnglishEnabled) ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      aria-label={`Switch to ${otherLang.toUpperCase()}`}
    >
      <span className="text-sm font-medium text-color-text">{displayLang}</span>
    </button>
  )
}
