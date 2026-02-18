'use client'

import { useEffect, useRef, useState } from 'react'
import { pricing, pricingTiers, pricingIncludes, pricingValueStack, pricingBadge, pricingCTA } from './constants'

interface PricingSectionProps {
  onApply: () => void
}

export default function PricingSection({ onApply }: PricingSectionProps) {
  const earlyBirdActive = new Date(pricing.earlyBirdDeadline).getTime() > Date.now()
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2 }
    )

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4 text-center">
          Стоимость
        </h2>

        {/* Dates (single line, no duplication) */}
        <p className="text-brand-muted text-sm mb-4 text-center">
          {pricing.dates}
        </p>

        {/* Early bird note */}
        {earlyBirdActive && (
          <p className="text-center text-brand-clay text-sm mb-10">
            {pricing.earlyBirdNote}
          </p>
        )}

        {/* 3 Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              ref={(el) => { cardsRef.current[index] = el }}
              data-index={index}
              className={`relative bg-brand-card p-10 border-2 transition-all duration-700 ${
                tier.highlight
                  ? 'border-brand-clay'
                  : 'border-brand-border'
              } ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-100 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-clay text-white text-xs font-medium px-4 py-1 whitespace-nowrap">
                  {pricingBadge}
                </span>
              )}

              <h3 className="text-lg font-medium text-brand-dark mb-2">{tier.name}</h3>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-brand-clay font-serif text-[42px]">
                  €{earlyBirdActive && tier.earlyBird ? tier.earlyBird : tier.price}
                </span>
              </div>

              {earlyBirdActive && tier.earlyBird && (
                <p className="text-brand-light text-sm mb-4">
                  <s>€{tier.price}</s> <span className="text-brand-sage">early bird</span>
                </p>
              )}
              {(!earlyBirdActive || !tier.earlyBird) && <div className="mb-4" />}

              <p className="text-brand-light text-[13px] mb-5">{tier.description}</p>

              {/* Includes inside each card */}
              <ul className="space-y-2 mb-6">
                {pricingIncludes.filter(item => item.included).map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-brand-muted text-sm">
                    <span className="text-brand-sage flex-shrink-0">✓</span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <button
                onClick={onApply}
                className="block w-full py-3 text-center transition-all text-[13px] uppercase tracking-wider font-medium bg-brand-clay text-white hover:bg-brand-clay-hover"
              >
                {pricingCTA}
              </button>

              <p className="text-brand-light text-xs mt-4 text-center">
                {pricing.depositNote}
              </p>
            </div>
          ))}
        </div>

        {/* Value stack */}
        <div className="mt-12 mb-8 max-w-2xl mx-auto">
          <p className="text-center text-brand-dark font-serif text-lg mb-6">Что входит в стоимость</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pricingValueStack.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-brand-muted text-sm">
                <span className="text-brand-sage flex-shrink-0 mt-0.5">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Not included + Application note */}
        <p className="text-center text-brand-muted text-sm mt-8">
          {pricing.notIncluded}
        </p>
        <p className="text-center text-brand-muted text-sm mt-4">
          {pricing.applicationNote}
        </p>
      </div>
    </section>
  )
}
