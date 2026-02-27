import React from 'react'
import SectionWrapper from '../ui/SectionWrapper'

const SERVICES = [
  { label: "Seelenrückführung", sub: "Past Life Regression" },
  { label: "Hypnose", sub: "Tiefenentspannung & Trancezustand" },
  { label: "Energiearbeit", sub: "Spirituelle Integration" },
]

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" data-testid="services-section">
      <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-black/10">
        {SERVICES.map((service, i) => (
          <div
            key={i}
            className="flex-1 py-10 md:py-8 md:px-10 first:md:pl-0 last:md:pr-0 flex flex-col justify-center"
            data-testid={`service-item-${i}`}
          >
            <span className="font-sans text-xs tracking-[0.18em] uppercase text-brand-steel mb-2 block">
              {service.sub}
            </span>
            <span className="font-serif text-2xl md:text-3xl text-brand-deep">
              {service.label}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
