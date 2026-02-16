'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
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
    <section id="faq" className="bg-gray-50 py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-16 text-center">
          Частые вопросы
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-800 text-lg pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                ref={(el) => { contentRefs.current[index] = el }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? `${heights[index] || 500}px` : '0px',
                }}
              >
                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
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
