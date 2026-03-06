// frontend/src/content/menu.js
// Zentrale Menü-Konfiguration
// Nested Struktur für Hauptkategorien + Unterpunkte

export const menu = {
  // Header-Konfiguration
  header: {
    logo: {
      src: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/logos/BKA%20logo%20500%20px%20black.png",
      alt: "Benjamin Kurtz Academy"
    },
    cta: {
      label: "Intro Call",
      anchor: "#booking"
    },
    variant: "sidecar", // "fullscreen" | "hybrid" | "mega" | "sidecar"

    // Hauptkategorien für Inline-Nav (Desktop)
    // hasSubmenu: true = mit Dropdown (Regression, Science, Erfahrungen)
    mainNav: [
      { label: "Regression", anchor: null, hasSubmenu: true },
      { label: "Science", anchor: null, hasSubmenu: true },
      { label: "Erfahrungen", anchor: null, hasSubmenu: true },
      { label: "Über", anchor: null, hasSubmenu: true },
      { label: "FAQ", anchor: null, hasSubmenu: true },
    ],
  },

  // Menü-Struktur (nested) für Sidecar Menu
  items: [
    {
      id: "regression",
      label: "Regression",
      order: 10,
      children: [
        {
          id: "regression-welcome",
          label: "Willkommen",
          anchor: "#hero",
          order: 11,
        },
        {
          id: "regression-what",
          label: "Was ist Regression?",
          anchor: "#was-ist",
          order: 12,
        },
        {
          id: "regression-for-whom",
          label: "Wer kommt zu einer Regression?",
          anchor: "#fuer-wen",
          order: 13,
        },
        {
          id: "regression-process",
          label: "Ablauf einer Session",
          anchor: "#prozess",
          order: 14,
        },
      ],
    },
    {
      id: "science",
      label: "Science",
      order: 20,
      children: [
        {
          id: "science-evidence",
          label: "Evidenz",
          anchor: "#evidence-quotes",
          order: 21,
        },
        {
          id: "science-authors",
          label: "Forscher & Autoren",
          anchor: "#science",
          order: 22,
        },
        {
          id: "science-references",
          label: "Literatur",
          anchor: "#references",
          order: 23,
        },
      ],
    },
    {
      id: "experiences",
      label: "Erfahrungen",
      order: 30,
      children: [
        {
          id: "experiences-cases",
          label: "Fallbeispiele",
          anchor: "#cases",
          order: 31,
        },
        {
          id: "experiences-love",
          label: "Wall of Love",
          anchor: "#testimonials",
          order: 32,
        },
        {
          id: "experiences-youtube",
          label: "Podcast (YouTube)",
          anchor: "#podcast-video",
          order: 33,
        },
        {
          id: "experiences-audio",
          label: "Audio-Podcast",
          anchor: "#podcast",
          order: 34,
        },
      ],
    },
    {
      id: "about",
      label: "Über",
      order: 40,
      children: [
        {
          id: "about-benjamin",
          label: "Benjamin Kurtz",
          anchor: "#ueber",
          order: 41,
        },
      ],
    },
    {
      id: "faq",
      label: "FAQ",
      order: 50,
      children: [
        {
          id: "faq-0",
          label: "Regression vs. Past Life Regression?",
          anchor: "#faq-0",
          order: 51,
        },
        {
          id: "faq-1",
          label: "Muss ich an Reinkarnation glauben?",
          anchor: "#faq-1",
          order: 52,
        },
        {
          id: "faq-2",
          label: "Ist das Channeling?",
          anchor: "#faq-2",
          order: 53,
        },
        {
          id: "faq-3",
          label: "Was passiert in einer Session?",
          anchor: "#faq-3",
          order: 54,
        },
        {
          id: "faq-more",
          label: "Mehr Antworten",
          anchor: "#faq",
          order: 55,
        },
      ],
    },
  ],

  // Footer-spezifische Menüpunkte (flach)
  footer: {
    items: [
      { label: "Regression", anchor: "#was-ist" },
      { label: "Science", anchor: "#science" },
      { label: "Für wen?", anchor: "#fuer-wen" },
      { label: "Über Benjamin", anchor: "#ueber" },
      { label: "Ablauf", anchor: "#prozess" },
      { label: "Erfahrungen", anchor: "#cases" },
      { label: "FAQ", anchor: "#faq" },
      { label: "Literatur", anchor: "#references" },
    ],
  },
};
