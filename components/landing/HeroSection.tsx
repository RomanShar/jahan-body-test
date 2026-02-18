'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { hero, TOTAL_SPOTS, SPOTS_TAKEN } from './constants'
import { useModal } from './ModalProvider'

const HERO_VIDEOS = [
  { src: '/videos/hero/dance-solo.mp4', label: 'Танец' },
  { src: '/videos/hero/dance-group.mp4', label: 'Движение' },
  { src: '/videos/hero/happy-dance.mp4', label: 'Радость' },
  { src: '/videos/hero/instrument-jahan.mp4', label: 'Музыка' },
]

// HeroSection no longer needs props — uses ModalProvider context

function VideoCard({
  video,
  className,
}: {
  video: typeof HERO_VIDEOS[number]
  className: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [video.src])

  return (
    <div className={className}>
      <div className="relative w-full h-full overflow-hidden rounded-sm">
        <video
          ref={videoRef}
          key={video.src}
          src={video.src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-serif text-lg">{video.label}</p>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const { openModal } = useModal()
  const [cardIdx, setCardIdx] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Rotate video cards — pause when section is off-screen
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null
    const start = () => {
      if (!timer) timer = setInterval(() => {
        setCardIdx(prev => (prev + 1) % HERO_VIDEOS.length)
      }, 8000)
    }
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null }
    }

    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? start() : stop() },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { stop(); observer.disconnect() }
  }, [])

  const staticBadges = hero.urgencyBadges.slice(0, 2)
  const spotsBadge = `✓ ${SPOTS_TAKEN} из ${TOTAL_SPOTS} мест занято`

  // Three cards on desktop, one on mobile
  const video1 = HERO_VIDEOS[cardIdx]
  const video2 = HERO_VIDEOS[(cardIdx + 1) % HERO_VIDEOS.length]
  const video3 = HERO_VIDEOS[(cardIdx + 2) % HERO_VIDEOS.length]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/landing/hero-generated.webp"
          alt="Побережье Пениша на закате - скалы, океан, Португалия"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="md:col-span-7 text-center md:text-left pt-16 md:pt-0">
          <span className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 text-white/90 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium shadow-lg">
            <svg className="w-3.5 h-3.5 text-white/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {hero.tagline}
          </span>

          <h1 className="font-serif text-[clamp(32px,5vw,56px)] text-white leading-[1.15] mb-8 drop-shadow-lg">
            {hero.headline.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-xl mx-auto md:mx-0 drop-shadow-md">
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
              className="border border-white text-white px-10 py-4 text-[13px] uppercase tracking-wider font-bold hover:bg-white hover:text-brand-dark transition-all duration-300"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-8 md:mt-12 flex flex-wrap justify-center md:justify-start gap-6 text-white/80 text-sm font-medium tracking-wide">
            {staticBadges.map((badge, i) => (
              <span key={i} className="backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                {badge}
              </span>
            ))}
            <span className="backdrop-blur-sm bg-brand-sage/30 px-3 py-1 rounded-full border border-brand-sage/40 text-white">
              {spotsBadge}
            </span>
          </div>
        </div>

        {/* Floating Video Cards — Desktop/Tablet: 3 cards (conditionally rendered to save mobile bandwidth) */}
        {isDesktop && (
          <div className="hidden md:block md:col-span-5 relative h-[600px]">
            <VideoCard
              video={video1}
              className="absolute top-4 right-4 w-56 aspect-[3/4] bg-white p-2 rounded-sm shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 ease-out z-10"
            />
            <VideoCard
              video={video2}
              className="absolute top-[180px] right-[200px] w-56 aspect-[3/4] bg-white p-2 rounded-sm shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-500 ease-out z-20"
            />
            <VideoCard
              video={video3}
              className="absolute bottom-10 right-[60px] w-56 aspect-[3/4] bg-white p-2 rounded-sm shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 ease-out z-30"
            />

            {/* Video dots — only highlight lead card */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {HERO_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCardIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === cardIdx
                      ? 'bg-white scale-125'
                      : 'bg-white/40'
                  }`}
                  aria-label={`Видео ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
