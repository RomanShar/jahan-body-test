'use client'

import { finalCTA, pricing, contact } from './constants'
import { MessageCircle, Mail } from 'lucide-react'

interface FinalCTASectionProps {
  onApply: () => void
}

export default function FinalCTASection({ onApply }: FinalCTASectionProps) {
  return (
    <section id="final-cta" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-purple-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          {finalCTA.headline}
        </h2>
        <p className="text-xl text-purple-100 mb-4 max-w-xl mx-auto">
          {finalCTA.description}
        </p>
        <p className="text-purple-200 mb-10">
          {pricing.dates}
        </p>

        <button
          onClick={onApply}
          className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all shadow-lg text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white mb-12"
        >
          {finalCTA.ctaPrimary}
        </button>

        {/* Contact links */}
        <p className="text-purple-200/80 text-sm mb-4">Есть вопросы? Напишите напрямую:</p>
        <div className="flex flex-wrap gap-6 justify-center text-purple-200">
          <a
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <MessageCircle className="w-5 h-5" />
            Telegram
          </a>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
        </div>
      </div>
    </section>
  )
}
