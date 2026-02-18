'use client'

import Image from 'next/image'
import { manifesto } from './constants'

export default function ManifestoSection() {
  return (
    <section className="bg-brand-dark py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-serif text-white text-[clamp(22px,3vw,30px)] leading-[1.5] whitespace-pre-line">
          {manifesto.quote}
        </p>

        <div className="mt-10 mb-10 border border-white/20 bg-white/5 px-8 py-6 max-w-xl mx-auto">
          <p className="text-white/90 text-lg leading-relaxed">
            Терапия работает с мыслями. Мы - с телом. Понимание не&nbsp;меняет химию тела. <span className="text-brand-clay font-medium">Движение - меняет.</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/20">
            <Image
              src="/images/landing/jahan-quote.webp"
              alt="Jahan"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-white/50 uppercase tracking-[0.2em] text-[13px]">
            {manifesto.author}
          </p>
        </div>
      </div>
    </section>
  )
}

