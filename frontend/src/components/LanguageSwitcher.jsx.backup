import { useSite } from '../contexts/SiteContext'

/**
 * LanguageSwitcher - DE/EN language selector
 *
 * Simple text showing current language (DE or EN).
 * Click to toggle to the other language.
 * English is disabled until content exists (Phase 6).
 *
 * @param {string} className - Additional CSS classes
 * @param {boolean} compact - If true, shows as compact text next to burger
 */
export default function LanguageSwitcher({ className = '', compact = false }) {
  const { currentLang, switchLanguage } = useSite()
  const isEnglishEnabled = false // TODO: Enable in Phase 6 when English content exists

  const handleSwitch = () => {
    if (currentLang === 'de') {
      // Try to switch to English
      if (!isEnglishEnabled) {
        // Show brief warning and stay on German
        alert('English coming soon!')
        return
      }
      switchLanguage('en')
    } else {
      switchLanguage('de')
    }
  }

  if (compact) {
    // Compact: "DE" only, shows current language
    return (
      <span
        onClick={handleSwitch}
        className={`text-sm font-medium text-color-text hover:text-color-primary cursor-pointer transition-colors ${className}`}
        title="Sprache wechseln / Switch language"
      >
        {currentLang.toUpperCase()}
      </span>
    )
  }

  // Full: "DE | EN" with both options
  const deClass = currentLang === 'de'
    ? 'text-color-primary font-medium'
    : 'text-color-text/60 hover:text-color-primary cursor-pointer'

  const enClass = currentLang === 'en'
    ? 'text-color-primary font-medium'
    : 'text-color-text/60 hover:text-color-primary cursor-pointer'

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <span
        onClick={() => currentLang !== 'de' && switchLanguage('de')}
        className={deClass + ' cursor-pointer transition-colors'}
      >
        DE
      </span>
      <span className="text-color-text/30">|</span>
      <span
        onClick={() => {
          if (!isEnglishEnabled) {
            alert('English coming soon!')
            return
          }
          if (currentLang !== 'en') switchLanguage('en')
        }}
        className={enClass + (isEnglishEnabled ? ' cursor-pointer transition-colors' : ' opacity-50 cursor-not-allowed')}
      >
        EN
      </span>
    </div>
  )
}
