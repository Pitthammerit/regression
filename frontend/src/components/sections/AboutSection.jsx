import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import LazyImage from '../ui/LazyImage'
import { r2, portraits } from '../../utils/media'

export default function AboutSection({ debugMode = false }) {
  const { about } = useContent()

  return (
    <SectionWrapper id="ueber" data-testid="about-section">
      <div className="grid md:grid-cols-2 md:card-grid-gap-lg items-start">

        {/* Left: Label + Portrait photo — sticky */}
        <div className="md:sticky md:top-28">
          {/* Label moved above image */}
          <DebugLabel type="typography-label" debugMode={debugMode}>
            <SectionLabel text={about.label} />
          </DebugLabel>

          <div className="aspect-[16/9] md:aspect-[3/4] rounded-2xl overflow-hidden bg-color-bg-light w-full md:max-w-sm mt-6">
            <LazyImage
              src={r2(portraits.p37)}
              alt="Benjamin Kurtz"
              className="w-full h-full object-cover object-top"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-body font-primary text-color-text">
                  {about.photoPlaceholder}
                </div>
              }
            />
          </div>
        </div>

        {/* Right: Bio */}
        <div>
          <DebugLabel type="typography-h2" debugMode={debugMode}>
            <h2 className="typography-h2 leading-tight heading-body-spacing">
              {about.headline}
            </h2>
          </DebugLabel>

          {about.body.map((para, i) => (
            <DebugLabel type="typography-body" debugMode={debugMode} key={i}>
              <p className={`typography-body ${i > 0 ? 'margin-top-sm' : ''}`}>
                {para}
              </p>
            </DebugLabel>
          ))}

          {/* Credentials */}
          <div className="mt-8 border-t border-color-light">
            <DebugLabel type="typography-label" debugMode={debugMode}>
              <p className="typography-label">
                {about.credentialsLabel}
              </p>
            </DebugLabel>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
              {about.credentials.map((cred, i) => (
                <li key={i} className="flex items-start gap-2">
                  <DebugLabel type="typography-list" debugMode={debugMode}>
                    <span className="text-color-primary shrink-0 mt-0.5">—</span>
                    {cred}
                  </DebugLabel>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
