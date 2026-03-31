import React from 'react'
import { services } from "../../content"

export default function ServicesSection() {
  return (
    <section id="services" className="pt-2 pb-8" data-testid="services-section">
      <div className="max-w-content mx-auto px-6">
        <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-color-border">
          {services.items.map((service, i) => (
            <div
              key={i}
              className="flex-1 py-6 md:py-5 md:px-10 first:md:pl-0 last:md:pr-0 flex flex-col justify-center"
              data-testid={`service-item-${i}`}
            >
              <span className="font-primary text-xs tracking-[0.18em] uppercase text-label mb-1.5 block">
                {service.sub}
              </span>
              <span className="font-serif text-xl md:text-2xl text-heading">
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
