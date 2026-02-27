import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const TOKEN = process.env.REACT_APP_TRANSCRIPT_TOKEN

const TRANSCRIPT_PLACEHOLDER = [
  {
    speaker: "Tobias Berg",
    text: "Herzlich willkommen zu Episode 52 von berggesundheit. Heute habe ich einen Gast, der sich mit einem Thema beschäftigt, das viele fasziniert, aber auch viele skeptisch macht: Seelenrückführung und Past Life Regression. Benjamin Kurtz, schön, dass du da bist."
  },
  {
    speaker: "Benjamin Kurtz",
    text: "Danke, Tobias. Ich freue mich sehr, über dieses Thema sprechen zu können – weil es so viele Missverständnisse gibt, und gleichzeitig so viele Menschen, die tiefe Erfahrungen damit gemacht haben."
  },
  {
    speaker: "Tobias Berg",
    text: "Lass uns mit einer ganz grundlegenden Frage beginnen: Was ist Seelenrückführung überhaupt? Was passiert da konkret?"
  },
  {
    speaker: "Benjamin Kurtz",
    text: "Seelenrückführung ist im Grunde ein hypnotischer Prozess, in dem du in einen tiefen Entspannungszustand geführt wirst – und in diesem Zustand können Erinnerungen auftauchen, die scheinbar nicht aus diesem Leben stammen. Manchmal sind es Bilder, manchmal Gefühle, manchmal ganze Szenen. Die zentrale Frage dabei ist nicht: Ist das wirklich ein früheres Leben? Sondern: Was zeigt mir das über mein jetziges Leben?"
  },
  {
    speaker: "Tobias Berg",
    text: "Das klingt faszinierend. Aber ich glaube, viele Zuhörer werden jetzt denken: Das ist doch einfach Einbildung oder Fantasie..."
  },
  {
    speaker: "Benjamin Kurtz",
    text: "Das ist eine sehr berechtigte Frage. Und ehrlich gesagt: Ian Stevenson an der University of Virginia hat über 2.500 Fälle dokumentiert – Kinder, die spontan von früheren Leben berichteten, mit verifizierbaren Details. Das sind keine Sitzungen, keine Hypnose – das sind Kinder, die einfach anfangen zu erzählen. Jim Tucker, sein Nachfolger, arbeitet bis heute daran. Die Forschung ist real, auch wenn sie in der Breite kaum wahrgenommen wird."
  },
  {
    speaker: "Tobias Berg",
    text: "Was hat dich persönlich dazu gebracht, diese Arbeit zu machen?"
  },
  {
    speaker: "Benjamin Kurtz",
    text: "Ein Erlebnis in einem langen Coaching-Tag. Nach fast zehn Stunden Arbeit führte mich eine Session in etwas, das sich wie ein früheres Leben anfühlte. Was danach passierte – das Verstehen von Mustern, die ich jahrelang nicht greifen konnte – das hat mich tief berührt. Nicht intellektuell. Durch direktes Erleben. Und da wusste ich: Das ist das, womit ich arbeiten möchte."
  },
  {
    speaker: "[Platzhalter]",
    text: "Das vollständige Transkript dieser Episode wird hier eingefügt, sobald es vorliegt. Dieser Text dient als Platzhalter für die Transkript-Reader-Funktion."
  }
]

export default function TranscriptPage() {
  const [searchParams] = useSearchParams()
  const [theme, setTheme] = useState('beige')
  const [fontSize, setFontSize] = useState(18)

  const token = searchParams.get('token')

  if (token !== TOKEN) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0EBE1]">
        <p className="font-serif text-4xl text-[#2D3F4E] mb-4">Kein Zugang.</p>
        <p className="font-sans text-sm text-[#7D7469]">
          Dieser Link ist nicht gültig oder abgelaufen.
        </p>
      </div>
    )
  }

  const isDark = theme === 'dark'
  const bg = isDark ? '#171614' : '#F0EBE1'
  const text = isDark ? '#D9D2C8' : '#2D2A26'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const toolbarBg = isDark ? 'rgba(23,22,20,0.92)' : 'rgba(240,235,225,0.92)'

  return (
    <div
      style={{ backgroundColor: bg, color: text, minHeight: '100vh' }}
      className="transition-colors duration-300"
      data-testid="transcript-page"
    >
      {/* ── Toolbar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4 backdrop-blur-md"
        style={{ backgroundColor: toolbarBg, borderBottom: `1px solid ${border}` }}
        data-testid="transcript-toolbar"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-wide" style={{ color: text }}>
            Transkript
          </span>
          <span
            className="font-sans text-xs uppercase tracking-widest ml-2"
            style={{ color: isDark ? 'rgba(217,210,200,0.4)' : 'rgba(45,42,38,0.4)' }}
          >
            Episode 52 · berggesundheit
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Font size controls */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1"
            style={{ border: `1px solid ${border}` }}
          >
            <button
              onClick={() => setFontSize(s => Math.max(13, s - 1))}
              className="px-2 py-0.5 font-sans text-xs hover:opacity-60 transition-opacity"
              style={{ color: text, fontSize: '13px' }}
              data-testid="font-decrease"
              aria-label="Schrift verkleinern"
            >
              A
            </button>
            <span style={{ color: border, fontSize: '12px' }}>|</span>
            <button
              onClick={() => setFontSize(s => Math.min(28, s + 1))}
              className="px-2 py-0.5 font-sans hover:opacity-60 transition-opacity"
              style={{ color: text, fontSize: '17px' }}
              data-testid="font-increase"
              aria-label="Schrift vergrößern"
            >
              A
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'beige' : 'dark')}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            style={{ border: `1px solid ${border}`, color: text }}
            data-testid="theme-toggle"
            aria-label="Hintergrund wechseln"
          >
            {isDark ? (
              <>
                <span style={{ fontSize: '14px' }}>◑</span>
                <span>Hell</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '14px' }}>●</span>
                <span>Dunkel</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">

        {/* Episode header */}
        <div
          className="mb-12 pb-10"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.2em] mb-4"
            style={{ color: isDark ? 'rgba(217,210,200,0.45)' : 'rgba(45,42,38,0.45)' }}
          >
            Episode 52 · berggesundheit · Tobias Berg · 1:14:32
          </p>
          <h1
            className="font-serif leading-tight"
            style={{ fontSize: `${Math.round(fontSize * 1.9)}px`, color: text }}
          >
            Reinkarnation: Was, wenn der Tod nicht das Ende ist?
          </h1>
          <p
            className="font-sans mt-4 leading-relaxed"
            style={{ fontSize: `${fontSize - 2}px`, color: isDark ? 'rgba(217,210,200,0.55)' : 'rgba(45,42,38,0.55)' }}
          >
            Benjamin Kurtz im ausführlichen Gespräch über Seelenrückführung, Reinkarnation und was wirklich in einer Session passiert.
          </p>
        </div>

        {/* Transcript blocks */}
        <div className="space-y-8">
          {TRANSCRIPT_PLACEHOLDER.map((block, i) => (
            <div key={i}>
              <p
                className="font-sans text-xs uppercase tracking-widest mb-2"
                style={{
                  color: isDark ? 'rgba(217,210,200,0.4)' : 'rgba(45,42,38,0.4)',
                  fontSize: `${fontSize - 6}px`
                }}
              >
                {block.speaker}
              </p>
              <p
                className="font-sans leading-[1.85]"
                style={{ fontSize: `${fontSize}px`, color: text }}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: `1px solid ${border}` }}
        >
          <p
            className="font-sans text-xs text-center"
            style={{ color: isDark ? 'rgba(217,210,200,0.3)' : 'rgba(45,42,38,0.3)' }}
          >
            © Benjamin Kurtz Academy · Nur für registrierte Empfänger
          </p>
        </div>
      </div>
    </div>
  )
}
