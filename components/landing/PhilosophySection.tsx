'use client'

import Image from 'next/image'
import { philosophyHeadline, philosophyCentralQuote, philosophyPillars, philosophyInsight, philosophyPermission } from './constants'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

const pillarImages: Record<string, { src: string; alt: string }> = {
  move: { src: '/images/landing/pillars/dance.webp', alt: 'Танец – движение тела' },
  wind: { src: '/images/landing/pillars/breathing.webp', alt: 'Дыхание – осознанное дыхание' },
  'volume-2': { src: '/images/landing/pillars/sound.webp', alt: 'Звук – голос и вибрация' },
}

export default function PhilosophySection() {
  const { visibleItems: visiblePillars, itemsRef: pillarsRef } = useAnimateOnScroll<HTMLDivElement>()

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
            const image = pillarImages[pillar.iconName]

            return (
              <div
                key={pillar.name}
                ref={(el) => { pillarsRef.current[index] = el }}
                data-index={index}
                className={`bg-brand-card p-10 text-center transition-[opacity,transform] duration-700 ${visiblePillars.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-28 h-28 mx-auto mb-5 overflow-hidden rounded-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
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
