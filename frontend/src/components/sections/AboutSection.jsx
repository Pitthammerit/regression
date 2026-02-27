import React, { useState } from 'react'
import { about } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import { r2, portraits } from '../../utils/media'

export default function AboutSection() {
  return (
    <SectionWrapper id="ueber" data-testid="about-section">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Left: Portrait photo — sticky */}
        <div className="md:sticky md:top-28">
          <div className="aspect-[3/4] rounded overflow-hidden bg-brand-sand max-w-sm">
            <LazyImage
              src={r2(portraits.p37)}
              alt="Benjamin Kurtz"
              className="w-full h-full object-cover object-top"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-brand-muted font-sans text-sm">
                  {about.photoPlaceholder}
                </div>
              }
            />
          </div>
        </div>

        {/* Right: Bio */}
        <div>
          <SectionLabel text={about.label} />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep mb-10 leading-tight">
            {about.headline}
          </h2>

          {about.body.map((para, i) => (
            <p key={i} className={`font-sans text-brand-body leading-relaxed text-lg ${i > 0 ? 'mt-6' : ''}`}>
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
