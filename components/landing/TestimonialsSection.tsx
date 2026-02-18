'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { testimonials, videoTestimonials, testimonialsHeadline, videoTestimonialsHeadline, videoTestimonialsSubheadline } from './constants'
import VideoReelsViewer from './VideoReelsViewer'

interface TestimonialsSectionProps {
  onApply?: () => void
}

export default function TestimonialsSection({ onApply }: TestimonialsSectionProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [reelsOpen, setReelsOpen] = useState(false)
  const [reelsStartIndex, setReelsStartIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2 }
    )

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const openReels = (index: number) => {
    setReelsStartIndex(index)
    setReelsOpen(true)
  }

  return (
    <section className="bg-brand-card py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-16 text-center">
          {testimonialsHeadline}
        </h2>

        {/* Text testimonials - masonry */}
        <div className="columns-1 md:columns-2 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el }}
              data-index={index}
              className={`break-inside-avoid mb-6 p-8 border border-brand-border transition-all duration-700 ${
                testimonial.featured
                  ? 'bg-brand-body border-l-[3px] border-l-brand-clay p-10'
                  : 'bg-brand-card'
              } ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                {testimonial.image && (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <p className="text-brand-clay text-xs uppercase tracking-widest">
                  {testimonial.name}
                </p>
              </div>

              <p className={`text-brand-muted leading-relaxed italic ${
                testimonial.featured ? 'text-lg mb-6' : 'text-[15px] mb-4'
              }`}>
                {testimonial.text}
              </p>

              {testimonial.resultHighlight && (
                <p className="text-brand-muted text-sm">
                  → {testimonial.resultHighlight}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Video testimonials subsection */}
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark mb-2">
            {videoTestimonialsHeadline}
          </h3>
          <p className="text-brand-muted text-[15px]">
            {videoTestimonialsSubheadline}
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
            {videoTestimonials.map((video, index) => (
              <button
                key={index}
                onClick={() => openReels(index)}
                className="relative flex-shrink-0 group focus-visible:outline-none snap-start"
              >
                {/* Clay ring */}
                <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full p-[3px] ring-2 ring-brand-clay group-hover:ring-brand-clay-hover transition-all group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-dark relative">
                    {video.videoUrl && (
                      <video
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                        onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
                      />
                    )}
                    {!video.videoUrl && (
                      <div className="absolute inset-0 bg-brand-dark" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center max-w-[100px] sm:max-w-[120px]">
                  <p className="text-brand-muted text-[11px] sm:text-xs font-medium truncate">{video.name}</p>
                  <p className="text-brand-light text-[10px]">{video.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {onApply && (
          <div className="text-center mt-14">
            <button
              onClick={onApply}
              className="inline-block bg-brand-clay text-white px-10 py-4 text-[13px] uppercase tracking-wider font-medium hover:bg-brand-clay-hover transition-all"
            >
              Хочу так же → Оставить заявку
            </button>
          </div>
        )}
      </div>

      {/* Reels fullscreen viewer */}
      {reelsOpen && (
        <VideoReelsViewer
          videos={videoTestimonials}
          startIndex={reelsStartIndex}
          onClose={() => setReelsOpen(false)}
        />
      )}
    </section>
  )
}
