import React from 'react'
import { about } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import LazyImage from '../ui/LazyImage'
import { r2, portraits } from '../../utils/media'

export default function AboutSectionCopy({ debugMode = false }) {
  return (
    <SectionWrapper id="ueber-copy" data-testid="about-section-copy">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Left: Portrait photo — sticky */}
        <div className="md:sticky md:top-28">
          <div className="aspect-[16/9] md:aspect-[3/4] rounded-2xl overflow-hidden bg-brand-sand w-full md:max-w-sm">
            <LazyImage
              src={r2(portraits.p37)}
              alt="Benjamin Kurtz"
              className="w-full h-full object-cover object-top"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-body font-primary text-color-body">
                  {about.photoPlaceholder}
                </div>
              }
            />
          </div>
        </div>

        {/* Right: Bio */}
        <div>
          <DebugLabel type="label" debugMode={debugMode}>
            <SectionLabel text={about.label} />
          </DebugLabel>
          <DebugLabel type="h3" debugMode={debugMode}>
            <h2 className="font-display text-h3 text-color-heading mb-10">
              {about.headline}
            </h2>
          </DebugLabel>

          {about.body.map((para, i) => (
            <DebugLabel type="body" debugMode={debugMode} key={i}>
              <p className={`font-primary text-color-body text-body ${i > 0 ? 'mt-6' : ''}`}>
                {para}
              </p>
            </DebugLabel>
          ))}

          {/* Credentials */}
          <div className="mt-12 pt-10 border-t border-black/10">
            <DebugLabel type="label" debugMode={debugMode}>
              <p className="font-primary text-label text-color-label mb-6">
                {about.credentialsLabel}
              </p>
            </DebugLabel>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
              {about.credentials.map((cred, i) => (
                <li key={i} className="font-primary text-list text-color-body flex items-start gap-2">
                  <DebugLabel type="list" debugMode={debugMode}>
                    <span className="text-color-heading shrink-0 mt-0.5">—</span>
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
