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
        alt="Джахан на телесном ретрите в Португалии — возвращение контакта с собой"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,92,246,0.15),transparent_50%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-purple-400 mb-6 font-medium">
          {hero.tagline}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
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

        {/* Urgency line */}
        <p className="mt-6 text-sm text-purple-200 font-medium">
          {hero.urgencyLine}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}
