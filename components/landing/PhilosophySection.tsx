'use client'

import { useEffect, useRef, useState } from 'react'
import { Move, Wind, Volume2 } from 'lucide-react'
import { philosophyHeadline, philosophyCentralQuote, philosophyPillars, philosophyInsight, philosophyPermission } from './constants'

const iconMap = {
  move: Move,
  wind: Wind,
  'volume-2': Volume2,
}

export default function PhilosophySection() {
  const [visiblePillars, setVisiblePillars] = useState<Set<number>>(new Set())
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisiblePillars((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2 }
    )

    pillarsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="philosophy" className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4 text-center">
          {philosophyHeadline}
        </h2>

        <blockquote className="text-center text-xl sm:text-2xl text-brand-muted italic max-w-2xl mx-auto mb-16">
          &laquo;{philosophyCentralQuote}&raquo;
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {philosophyPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.iconName]

            return (
              <div
                key={pillar.name}
                ref={(el) => { pillarsRef.current[index] = el }}
                data-index={index}
                className={`bg-brand-card p-10 text-center transition-all duration-700 ${visiblePillars.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-brand-body flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-brand-sage" />
                </div>

                <p className="text-brand-clay uppercase tracking-widest text-xs mb-3">
                  {pillar.name}
                </p>

                <p className="text-brand-muted leading-relaxed mb-4">
                  &laquo;{pillar.quote}&raquo;
                </p>


              </div>
            )
          })}
        </div>

        <blockquote className="text-center text-xl sm:text-2xl text-brand-dark max-w-2xl mx-auto mt-16 leading-relaxed">
          {philosophyInsight}
        </blockquote>

        <p className="text-center text-brand-muted italic text-lg max-w-xl mx-auto mt-8">
          {philosophyPermission}
        </p>
      </div>
    </section>
  )
}
