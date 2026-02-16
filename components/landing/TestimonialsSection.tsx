'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Quote, User } from 'lucide-react'
import { testimonials, testimonialsHeadline } from './constants'

export default function TestimonialsSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

  return (
    <section className="bg-gray-50 py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-16 text-center">
          {testimonialsHeadline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el }}
              data-index={index}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between transition-all duration-700 ${
                index === testimonials.length - 1 && testimonials.length % 2 !== 0
                  ? 'md:col-span-2 md:max-w-lg md:mx-auto'
                  : ''
              } ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div>
                <Quote className="w-8 h-8 text-purple-200 mb-4" />

                {testimonial.resultHighlight && (
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {testimonial.resultHighlight}
                  </span>
                )}

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {testimonial.text}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {testimonial.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                )}
                <p className="font-medium text-gray-600 text-sm italic">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
