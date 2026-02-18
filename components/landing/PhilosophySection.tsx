'use client'

import { philosophyHeadline, philosophyCentralQuote, philosophyPillars, philosophyInsight, philosophyPermission } from './constants'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

function DanceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Head */}
      <circle cx="16.5" cy="6" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Spine — flowing S-curve */}
      <path d="M16.5 8 C17.5 10.5 18 13 17.5 15.5 C17 17 16 18 15.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Standing leg */}
      <path d="M15.5 19 C14 22.5 12 25.5 10.5 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Lifted leg — arabesque */}
      <path d="M15.5 19 C19 17.5 23 15.5 27 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Left arm — reaching up */}
      <path d="M17.5 10.5 C15 8.5 12 6 9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Right arm — extended forward */}
      <path d="M17.5 10.5 C20 12 22 13 25 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BreathIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Head */}
      <circle cx="16" cy="4.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Spine */}
      <path d="M16 6.5 L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Arms resting outward */}
      <path d="M16 10 C13 11 10 14 8 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10 C19 11 22 14 24 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Crossed legs — V shape */}
      <path d="M16 15 C14 18 10 21 7 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 15 C18 18 22 21 25 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Breath arcs — symmetric expansion */}
      <path d="M7 9 C9 7.5 11 7.5 13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 9 C21 7.5 23 7.5 25 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function VoiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Head tilted up */}
      <circle cx="12.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Spine */}
      <path d="M12.5 7.5 C12.5 10 13 13 13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Arms relaxed at sides */}
      <path d="M13 10 C10.5 11.5 9 13.5 8.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 10 C15 11.5 16.5 13 17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Legs */}
      <path d="M13 16 C12.5 19.5 11.5 23 10.5 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 16 C13.5 19.5 14.5 23 15.5 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Sound waves — organic curves from throat */}
      <path d="M16 5 C17.5 6.5 17.5 9 16.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 3.5 C21 6 21.5 10 19.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const iconMap = {
  move: DanceIcon,
  wind: BreathIcon,
  'volume-2': VoiceIcon,
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
            const Icon = iconMap[pillar.iconName]

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
