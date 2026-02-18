import Image from 'next/image'
import { manifesto } from './constants'

export default function ManifestoSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/landing/jahan-quote.webp"
        alt="Джахан"
        fill
        className="object-cover object-[50%_25%]"
        sizes="100vw"
        loading="lazy"
      />
      {/* Gradient overlay — light on top to show face, dark at bottom for text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Content pinned to bottom */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 sm:pb-20 pt-40 text-center w-full">
        <p className="font-serif text-white text-[clamp(26px,4vw,38px)] leading-[1.4] whitespace-pre-line drop-shadow-lg">
          {manifesto.quote}
        </p>

        <p className="text-white/50 uppercase tracking-[0.2em] text-[13px] mt-6">
          {manifesto.author}
        </p>
      </div>
    </section>
  )
}
