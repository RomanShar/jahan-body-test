'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { hero } from './constants'
import { useModal } from './ModalProvider'

export default function HeroSection() {
  const { openModal } = useModal()
  const [showScrollHint, setShowScrollHint] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollHint(window.scrollY < 100)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col bg-brand-dark overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-20 md:py-0">
          {/* Left — text */}
          <div className="text-center md:text-left pt-16 md:pt-0 order-1">
            <span className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 text-white/90 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
              <svg className="w-3.5 h-3.5 text-white/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {hero.tagline}
            </span>

            <h1 className="font-serif text-[clamp(40px,6vw,72px)] text-white leading-[1.05] mb-6">
              {hero.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={openModal}
                className="bg-white text-brand-dark px-10 py-4 text-[13px] uppercase tracking-wider font-bold hover:bg-brand-clay hover:text-white transition-all duration-300"
              >
                {hero.ctaPrimary}
              </button>
              <a
                href={hero.ctaSecondaryHref}
                className="border border-white/40 text-white px-10 py-4 text-[13px] uppercase tracking-wider font-bold hover:bg-white hover:text-brand-dark transition-all duration-300"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right — photo + subtitle overlay */}
          <div className="relative order-2">
            <div className="relative aspect-[3/4] max-h-[70vh] mx-auto md:mx-0 rounded-sm overflow-hidden">
              <Image
                src={hero.heroImage}
                alt="Джахан — ведущий ретрита"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 80vw, 45vw"
              />
              {/* Gradient overlay at bottom for subtitle */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            {/* Subtitle overlay — bottom right of photo */}
            <p className="absolute bottom-6 right-4 left-4 md:left-auto md:right-6 text-right text-white text-base sm:text-lg font-medium leading-snug max-w-sm ml-auto">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar — social proof */}
      <div className="border-t border-white/10 bg-brand-dark/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center md:justify-between gap-x-8 gap-y-2">
          {hero.socialProof.map((item, i) => (
            <span key={i} className="text-white/60 text-xs sm:text-sm whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce hidden md:block transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
