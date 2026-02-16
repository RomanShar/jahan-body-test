'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, Pill, Hospital, Home, User, Plane } from 'lucide-react'
import { painPoints, painPointsHeadline, painPointsClosing, statsBar } from './constants'

const iconMap = {
  '🤖': Bot,
  '💊': Pill,
  '🏥': Hospital,
  '🏠': Home,
  '🫥': User,
  '✈️': Plane,
}

export default function PainPointsSection() {
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

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-brand-dark py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-16 text-center">
          {painPointsHeadline}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {painPoints.map((point, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el }}
              data-index={index}
              className={`bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-700 ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {(() => {
                  const IconComponent = iconMap[point.icon as keyof typeof iconMap]
                  return IconComponent ? (
                    <IconComponent className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  ) : (
                    <span className="text-2xl flex-shrink-0">{point.icon}</span>
                  )
                })()}
                <p className="text-gray-200 text-lg leading-relaxed">
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xl sm:text-2xl text-gray-300 font-light italic max-w-2xl mx-auto leading-relaxed">
          {painPointsClosing}
        </p>

        {/* Stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 mb-4">
          {statsBar.items.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">{stat.number}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">{statsBar.source}</p>
      </div>
    </section>
  )
}
