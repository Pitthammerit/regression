import { useSite } from '../contexts/SiteContext'

/**
 * LanguageSwitcher - DE/EN language toggle
 *
 * Displays current language and allows switching between DE and EN.
 * English button is disabled until English content exists (Phase 6).
 *
 * @param {string} className - Additional CSS classes
 */
export default function LanguageSwitcher({ className = '' }) {
  const { currentLang, switchLanguage } = useSite()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => switchLanguage('de')}
        className={`text-sm font-medium transition-colors ${
          currentLang === 'de'
            ? 'text-color-primary'
            : 'text-color-text/60 hover:text-color-primary'
        }`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <span className="text-color-text/30">|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`text-sm font-medium transition-colors ${
          currentLang === 'en'
            ? 'text-color-primary'
            : 'text-color-text/60 hover:text-color-primary'
        }`}
        aria-label="English"
        disabled={currentLang === 'en'} // Disable until English content exists
      >
        EN
      </button>
    </div>
  )
}
