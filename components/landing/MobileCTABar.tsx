'use client'

import { useEffect, useState } from 'react'
import { useModal } from './ModalProvider'
import { TOTAL_SPOTS, SPOTS_TAKEN } from './constants'

export default function MobileCTABar() {
  const { openModal } = useModal()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.5)
        ticking = false
      })
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
      <div className="bg-brand-body/92 backdrop-blur-md border-t border-brand-border px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <button
          onClick={openModal}
          className="block w-full bg-brand-clay text-white py-3 text-[13px] uppercase tracking-wider font-medium text-center hover:bg-brand-clay-hover transition-all"
        >
          Занять место · {SPOTS_TAKEN} из {TOTAL_SPOTS}
        </button>
      </div>
    </div>
  )
}
