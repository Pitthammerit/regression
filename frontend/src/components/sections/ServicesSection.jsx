import React from 'react'
import { services } from '../../content/plr-de'
import DebugLabel from '../ui/DebugLabel'

export default function ServicesSection({ debugMode = false }) {
  return (
    <section id="services" className="pt-2 pb-8" data-testid="services-section">
      <div className="max-w-content mx-auto px-6">
        <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-black/10">
          {services.items.map((service, i) => (
            <div
              key={i}
              className="flex-1 py-6 md:py-5 md:px-10 first:md:pl-0 last:md:pr-0 flex flex-col justify-center"
              data-testid={`service-item-${i}`}
            >
              <DebugLabel type="label" debugMode={debugMode}>
                <span className="font-primary text-label tracking-label-alt label text-color-secondary block-label-spacing">
                  {service.sub}
                </span>
              </DebugLabel>
              <DebugLabel type="h4" debugMode={debugMode}>
                <span className="font-secondary text-h4 text-color-primary">
                  {service.label}
                </span>
              </DebugLabel>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
