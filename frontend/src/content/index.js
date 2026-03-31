// frontend/src/content/index.js
// Content loader for multi-site, multi-language architecture

import regressionDe from './regression-de.js'
import regressionEn from './regression-en.js'
import reikiDe from './reiki-de.js'

// Content map: site -> language -> content
const CONTENT_MAP = {
  regression: {
    de: regressionDe,
    en: regressionEn, // English placeholder content (Phase 6)
  },
  reiki: {
    de: reikiDe,
    en: null, // Coming later
  },
}

/**
 * Get content for a specific site and language
 * @param {string} site - Site identifier ('regression' | 'reiki')
 * @param {string} lang - Language code ('de' | 'en')
 * @returns {object} Content object with all site content
 */
export function getContent(site = 'regression', lang = 'de') {
  const siteContent = CONTENT_MAP[site] || CONTENT_MAP.regression
  const content = siteContent[lang] || siteContent.de

  if (!content) {
    console.warn(`Content not found for site=${site}, lang=${lang}`)
    return CONTENT_MAP.regression.de
  }

  return content
}

/**
 * Get list of available sites
 * @returns {string[]} Array of site identifiers
 */
export function getAvailableSites() {
  return Object.keys(CONTENT_MAP)
}

/**
 * Get list of available languages for a site
 * @param {string} site - Site identifier
 * @returns {string[]} Array of language codes
 */
export function getAvailableLanguages(site = 'regression') {
  const siteContent = CONTENT_MAP[site]
  if (!siteContent) return ['de']
  return Object.keys(siteContent).filter(lang => siteContent[lang] !== null)
}

// Re-export all content from regression-de for backwards compatibility
// This allows imports like: import { services } from './content'
export const meta = regressionDe.meta
export const header = regressionDe.header
export const hero = regressionDe.hero
export const services = regressionDe.services
export const welcome = regressionDe.welcome
export const statement = regressionDe.statement
export const whatIs = regressionDe.whatIs
export const podcasts = regressionDe.podcasts
export const forWhom = regressionDe.forWhom
export const about = regressionDe.about
export const processSection = regressionDe.processSection
export const cases = regressionDe.cases
export const researchers = regressionDe.researchers
export const references = regressionDe.references
export const simpleCta = regressionDe.simpleCta
export const ctaImage = regressionDe.ctaImage
export const testimonials = regressionDe.testimonials
export const booking = regressionDe.booking
export const faq = regressionDe.faq
export const footer = regressionDe.footer
export const ui = regressionDe.ui
export const transcriptPage = regressionDe.transcriptPage
export const notFound = regressionDe.notFound
export const podcastVideo = regressionDe.podcastVideo
export const menu = regressionDe.menu

// Default export: Regression German content (backwards compatibility)
export default regressionDe
