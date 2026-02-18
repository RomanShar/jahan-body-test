'use client'

import { finalCTA, pricing } from './constants'
import { useModal } from './ModalProvider'

export default function FinalCTASection() {
  const { openModal } = useModal()
  return (
    <section id="final-cta" className="bg-brand-dark py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6">
          {finalCTA.headline}
        </h2>
        <p className="text-xl text-white/70 mb-4 max-w-xl mx-auto">
          {finalCTA.description}
        </p>
        <p className="text-white/50 mb-10">
          {pricing.dates}
        </p>

        <button
          onClick={openModal}
          className="bg-brand-clay text-white px-10 py-4 text-[13px] uppercase tracking-wider font-medium hover:bg-brand-clay-hover transition-all mb-6"
        >
          {finalCTA.ctaPrimary}
        </button>

        {/* Telegram channel */}
        <p className="text-white/50 text-sm mb-12">
          Или{' '}
          <a
            href={finalCTA.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 underline underline-offset-4 hover:text-white transition"
          >
            {finalCTA.telegramChannelText}
          </a>
          {finalCTA.telegramChannelNote}
        </p>

        {/* Health disclaimer */}
        <p className="text-white/30 text-xs mt-12 max-w-md mx-auto">
          {finalCTA.healthDisclaimer}
        </p>
      </div>
    </section>
  )
}
