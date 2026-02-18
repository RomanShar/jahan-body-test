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
      <circle cx="16" cy="7" r="2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 27C7 20 11 15 16 15C21 15 25 20 25 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20C13.5 19 18.5 19 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 24C14 23.5 18 23.5 19 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function VoiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M13 6C9 6 8 10 8 13L8 15L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 20L9 21C9 24 11 26 14 26L14 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 14C18 15 18 21 16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 11C23 13 23 23 20 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 8C29 11 29 25 24 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
