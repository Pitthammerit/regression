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
    variant: "fullscreen", // "fullscreen" | "hybrid" | "mega" | "anchor"

    // Hauptkategorien für Inline-Nav (Desktop) - können angepasst werden
    mainNav: [
      { label: "Regression", anchor: "#was-ist" },
      { label: "Science", anchor: "#science" },
      { label: "Erfahrungen", anchor: "#cases" },
      { label: "Über", anchor: "#ueber" },
      { label: "FAQ", anchor: "#faq" },
    ],
  },

  // Menü-Struktur (nested)
  items: [
    {
      id: "regression",
      label: "Regression",
      anchor: "#was-ist",
      order: 10,
    },
    {
      id: "science",
      label: "Science",
      order: 20,
      children: [
        {
          id: "science-quotes",
          label: "Forscherzitate",
          anchor: "#evidence-quotes",
          order: 21,
        },
        {
          id: "science-authors",
          label: "Autoren",
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
      id: "podcast",
      label: "Podcast",
      order: 30,
      children: [
        {
          id: "podcast-video",
          label: "Video-Gespräch",
          anchor: "#podcast-video",
          order: 31,
        },
        {
          id: "podcast-audio",
          label: "Audio",
          anchor: "#podcast",
          order: 32,
        },
      ],
    },
    {
      id: "experiences",
      label: "Erfahrungen",
      order: 40,
      children: [
        {
          id: "experiences-cases",
          label: "Fallbeispiele",
          anchor: "#cases",
          order: 41,
        },
        {
          id: "experiences-testimonials",
          label: "Klientenstimmen",
          anchor: "#testimonials",
          order: 42,
        },
      ],
    },
    {
      id: "about",
      label: "Über",
      order: 50,
      children: [
        {
          id: "about-benjamin",
          label: "Benjamin Kurtz",
          anchor: "#ueber",
          order: 51,
        },
        {
          id: "about-process",
          label: "Prozess",
          anchor: "#prozess",
          order: 52,
        },
        {
          id: "about-forwhom",
          label: "Für wen?",
          anchor: "#fuer-wen",
          order: 53,
        },
      ],
    },
    {
      id: "faq",
      label: "FAQ",
      anchor: "#faq",
      order: 60,
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
