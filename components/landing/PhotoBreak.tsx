import Image from 'next/image'

interface PhotoBreakProps {
  src: string
  alt: string
  quote?: string
}

export default function PhotoBreak({ src, alt, quote }: PhotoBreakProps) {
  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      {quote && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="text-white text-xl sm:text-2xl md:text-3xl font-serif text-center max-w-3xl leading-relaxed drop-shadow-lg">
            {quote}
          </p>
        </div>
      )}
    </div>
  )
}
