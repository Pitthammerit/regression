import React from 'react'
import { testimonials } from '../../content/plr-de'

export default function EvidenceSection() {
  const authorities = testimonials.authorityQuotes

  return (
    <section
      id="evidence"
      data-testid="evidence-section"
      className="py-20 md:py-28 bg-brand-deep text-white relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-sans text-xs uppercase tracking-[0.2em] text-brand-steel/80 mb-4">
            {testimonials.authorityBigLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            {testimonials.authorityHeadline}
          </h2>
        </div>

        {/* Three Portraits with Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {authorities.map((authority, index) => {
            const portraitUrl = {
              0: 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/authors/Ian_Stevenson_2.jpg',
              1: 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/authors/Brian-weiss_md.jpeg',
              2: 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/authors/Jim_Tucker.jpg',
            }[index]

            return (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Portrait - Square */}
                <div className="aspect-square w-full max-w-[240px] mb-6 overflow-hidden rounded-sm bg-brand-dark/50">
                  <img
                    src={portraitUrl}
                    alt={authority.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                {/* Quote */}
                <blockquote className="font-serif text-lg md:text-xl text-white/90 leading-snug mb-4 italic">
                  "{authority.quote}"
                </blockquote>

                {/* Attribution */}
                <div className="font-sans text-sm text-brand-steel">
                  <span className="font-semibold">— {authority.name}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Flowing Text Section */}
        <div className="space-y-8 md:space-y-10 mb-16">
          {/* Ian Stevenson */}
          <div>
            <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3">
              Ian Stevenson, MD
            </p>
            <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
              University of Virginia, DOPS
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl">
              sagt, dass in über 2.500 dokumentierten Kinderfällen mit verifizierbaren Erinnerungen an frühere Leben
              starke Übereinstimmungen zwischen berichteten Erlebnissen und historischen Fakten gefunden wurden.
              Über 290 peer-reviewed Publikationen dokumentieren diese Fälle, die unter strengen wissenschaftlichen
              Kriterien untersucht wurden.
            </p>
          </div>

          {/* Jim Tucker */}
          <div>
            <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3">
              Jim Tucker, MD
            </p>
            <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
              Nachfolger Stevensons, UVA
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl">
              hat eine quantitative Auswertung von 799 Fällen gemacht. Der Fall James Leininger — Erinnerungen eines
              Zweijährigen an einen WWII-Piloten — gilt als einer der bestdokumentierten weltweit. Das Kind konnte
              spezifische Details benennen, die sich später als historisch akkurat erwiesen: Namen des Piloten,
              Staffelzugehörigkeit und Todesumstände.
            </p>
          </div>

          {/* Brian Weiss */}
          <div>
            <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3">
              Brian Weiss, MD
            </p>
            <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
              Ehem. Chefarzt Psychiatrie, Mount Sinai
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl">
              "Many Lives Many Masters" (1988) — klinische Falldokumentation über Jahrzehnte. Was mit einer
              skeptischen Haltung begann, veränderte sich durch eine Patientin, die unter Hypnose frühere Leben
              beschrieb, die sich verifizieren ließen. Seine Arbeit hat tausenden Therapeuten weltweit Zugang zu
              regressionsbasierten Methoden eröffnet.
            </p>
          </div>
        </div>

        {/* Journal of Regression Therapy */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start max-w-4xl">
          {/* Journal Image */}
          <div className="w-full md:w-1/3 aspect-[3/4] max-w-[200px] overflow-hidden rounded-sm bg-brand-dark/50 shrink-0">
            <img
              src="https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/authors/journal-of-regression-therapy.jpg"
              alt="Journal of Regression Therapy"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Journal Text - Indented */}
          <div className="flex-1 md:ml-8">
            <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3">
              Journal of Regression Therapy
            </p>
            <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
              regressionjournal.org
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed">
              Das führende peer-reviewed Journal für Reinkarnationsforschung und regressionstherapeutische Praxis.
              Vollständig Open Access seit 2021 — alle Ausgaben seit 1986 sind frei zugänglich. Die Artikel
              dokumentieren sowohl klinische Fallstudien als auch wissenschaftliche Untersuchungen von
              Reinkarnationsfällen weltweit.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
