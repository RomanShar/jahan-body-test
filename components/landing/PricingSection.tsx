'use client'

import { useState, useEffect } from 'react'
import { Check, X } from 'lucide-react'
import { pricing, pricingTiers, pricingIncludes } from './constants'

function useCountdown(deadline: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    function calculate() {
      const diff = new Date(deadline).getTime() - Date.now()
      if (diff <= 0) {
        setExpired(true)
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  return { timeLeft, expired }
}

interface PricingSectionProps {
  onApply: () => void
}

export default function PricingSection({ onApply }: PricingSectionProps) {
  const { timeLeft, expired } = useCountdown(pricing.earlyBirdDeadline)

  return (
    <section id="pricing" className="bg-white py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          Стоимость
        </h2>

        {/* Dates & group size */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
            {pricing.dates}
          </span>
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
            до {pricing.groupSize} участников
          </span>
        </div>

        {/* Countdown timer */}
        {!expired && (
          <div className="text-center mb-10">
            <p className="text-sm text-gray-500 mb-2">Early Bird цена заканчивается через:</p>
            <div className="flex justify-center gap-3">
              {[
                { value: timeLeft.days, label: 'дн' },
                { value: timeLeft.hours, label: 'ч' },
                { value: timeLeft.minutes, label: 'мин' },
                { value: timeLeft.seconds, label: 'сек' },
              ].map((unit, i) => (
                <div key={i} className="bg-brand-dark text-white rounded-lg px-3 py-2 min-w-[56px] text-center">
                  <span className="text-xl font-bold block">{String(unit.value).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-400">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3 Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 border-2 ${
                tier.highlight
                  ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  Рекомендуем
                </span>
              )}

              <h3 className="text-xl font-bold text-gray-800 mb-1">{tier.name}</h3>
              <p className="text-gray-500 text-sm mb-6">{tier.description}</p>

              <div className="flex items-baseline gap-2 mb-6">
                {!expired && tier.earlyBird && (
                  <span className="text-gray-400 line-through text-lg">
                    {tier.price}
                  </span>
                )}
                <span className="text-4xl font-bold text-gray-800">
                  {!expired && tier.earlyBird ? tier.earlyBird : tier.price}
                </span>
                <span className="text-gray-500">{pricing.currency}</span>
              </div>

              <button
                onClick={onApply}
                className={`block w-full py-3 rounded-xl font-semibold text-center transition-all text-lg ${
                  tier.highlight
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Оставить заявку
              </button>
            </div>
          ))}
        </div>

        {/* Deposit note */}
        <p className="text-center text-gray-700 text-base mb-3 font-medium">
          Начните за <span className="text-purple-600 font-bold text-lg">€100</span>. Остаток — за 14 дней до ретрита.
        </p>

        {/* Application note */}
        <p className="text-center text-gray-400 text-sm mb-3">
          {pricing.applicationNote}
        </p>

        {/* Comparison anchor */}
        <p className="text-center text-gray-600 text-base mb-10 italic font-light max-w-2xl mx-auto">
          {pricing.comparisonAnchor}
        </p>

        {/* What's included */}
        <div className="max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Что входит в стоимость</h3>
          <div className="space-y-3">
            {pricingIncludes.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {item.included ? (
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <span className={item.included ? 'text-gray-700' : 'text-gray-400'}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
