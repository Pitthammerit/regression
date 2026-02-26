import React from 'react'
import { about } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import { r2 } from '../../utils/media'

const ABOUT_PHOTO = 'RTR2/photos/benjamin-kurtz.jpg'

export default function AboutSection() {
  return (
    <SectionWrapper id="ueber" data-testid="about-section">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Left: Photo */}
        <div>
          <PhotoWithFallback label={about.photoPlaceholder} />
        </div>

        {/* Right: Bio */}
        <div>
          <SectionLabel text={about.label} />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep mb-10 leading-tight">
            {about.headline}
          </h2>

          {about.body.map((para, i) => (
            <p key={i} className={`font-sans text-brand-body leading-[1.8] text-base ${i > 0 ? 'mt-6' : ''}`}>
              {para}
            </p>
          ))}

          {/* Credentials */}
          <div className="mt-12 pt-10 border-t border-black/10">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-brand-steel mb-6">
              {about.credentialsLabel}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
              {about.credentials.map((cred, i) => (
                <li key={i} className="font-sans text-sm text-brand-muted flex items-start gap-2">
                  <span className="text-brand-deep shrink-0 mt-0.5">—</span>
                  {cred}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
