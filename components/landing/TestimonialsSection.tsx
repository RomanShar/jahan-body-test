'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { testimonials, videoTestimonials, testimonialsHeadline, videoTestimonialsHeadline, videoTestimonialsSubheadline } from './constants'
import VideoReelsViewer from './VideoReelsViewer'
import { useModal } from './ModalProvider'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'

export default function TestimonialsSection() {
  const { openModal } = useModal()
  const { visibleItems: visibleCards, itemsRef: cardsRef } = useAnimateOnScroll<HTMLDivElement>()
  const [reelsOpen, setReelsOpen] = useState(false)
  const [reelsStartIndex, setReelsStartIndex] = useState(0)

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
              className={`break-inside-avoid mb-6 p-8 border border-brand-border transition-[opacity,transform] duration-700 ${
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
              <VideoCircle key={index} video={video} index={index} onOpen={openReels} />
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <button
            onClick={openModal}
            className="inline-block bg-brand-clay text-white px-10 py-4 text-[13px] uppercase tracking-wider font-medium hover:bg-brand-clay-hover transition-all"
          >
            Хочу так же → Оставить заявку
          </button>
        </div>
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
