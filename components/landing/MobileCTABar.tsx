'use client'

import { useEffect, useState } from 'react'

interface MobileCTABarProps {
  onApply: () => void
}

export default function MobileCTABar({ onApply }: MobileCTABarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-brand-dark/95 backdrop-blur-md border-t border-white/10 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <button
          onClick={onApply}
          className="block w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-center text-sm shadow-lg hover:bg-purple-700 transition-all"
        >
          Оставить заявку
        </button>
      </div>
    </div>
  )
}
