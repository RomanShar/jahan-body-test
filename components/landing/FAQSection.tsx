'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import { faqItems } from './constants'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    const measured = contentRefs.current.map((ref) => ref?.scrollHeight || 0)
    setHeights(measured)
  }, [openIndex])

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-16 text-center">
          Частые вопросы
        </h2>

        <div className="divide-y divide-brand-border">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                id={`faq-btn-${index}`}
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-6 text-left focus-visible:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="font-serif text-brand-dark text-lg pr-4">
                  {item.question}
                </span>
                <span className="text-brand-muted text-xl flex-shrink-0 w-6 text-center transition-transform duration-300">
                  {openIndex === index ? '×' : '+'}
                </span>
              </button>
              <div
                id={`faq-panel-${index}`}
                ref={(el) => { contentRefs.current[index] = el }}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? `${heights[index] || 500}px` : '0px',
                }}
              >
                <p className="pb-6 text-brand-muted leading-relaxed text-[15px]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
