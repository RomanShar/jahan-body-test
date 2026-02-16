'use client'

import Image from 'next/image'
import { hero } from './constants'

interface HeroSectionProps {
  onApply: () => void
}

export default function HeroSection({ onApply }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo + overlay */}
      <Image
        src={hero.heroImage}
        alt="Суперблизость — телесный тренинг Джахана в Португалии"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,92,246,0.15),transparent_50%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-purple-400 mb-6 font-medium">
          {hero.tagline}
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {hero.headline}
        </h1>

        <p className="text-xl sm:text-2xl text-white mb-4">
          {hero.subheadline}
        </p>

        <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onApply}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 text-lg"
          >
            {hero.ctaPrimary}
          </button>
          <a
            href="#retreat"
            className="border border-gray-500 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-gray-300 hover:text-white transition-all text-lg"
          >
            {hero.ctaSecondary}
          </a>
        </div>

        {/* Urgency badges */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {hero.urgencyBadges.map((badge, i) => (
            <span
              key={i}
              className="bg-white/10 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
