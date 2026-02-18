'use client'

import Image from 'next/image'
import { manifesto } from './constants'

export default function ManifestoSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/landing/jahan-quote.webp"
        alt="Джахан"
        fill
        className="object-cover object-[50%_25%]"
        sizes="100vw"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 sm:py-24 text-center">
        <p className="font-serif text-white text-[clamp(22px,3vw,30px)] leading-[1.5] whitespace-pre-line drop-shadow-lg">
          {manifesto.quote}
        </p>

        <div className="mt-10 mb-10 border border-white/20 bg-black/30 backdrop-blur-sm px-8 py-6 max-w-xl mx-auto">
          <p className="text-white/90 text-lg leading-relaxed">
            Терапия работает с мыслями. Мы - с телом. Понимание не&nbsp;меняет химию тела. <span className="text-brand-clay font-medium">Движение - меняет.</span>
          </p>
        </div>

        <p className="text-white/60 uppercase tracking-[0.2em] text-[13px]">
          {manifesto.author}
        </p>
      </div>
    </section>
  )
}
