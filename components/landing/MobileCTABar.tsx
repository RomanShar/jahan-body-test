'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const TOTAL_SPOTS = 20

interface MobileCTABarProps {
  onApply: () => void
}

export default function MobileCTABar({ onApply }: MobileCTABarProps) {
  const [visible, setVisible] = useState(false)
  const [spotsOccupied, setSpotsOccupied] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
        setSpotsOccupied(count || 0)
      } catch {
        // fallback
      }
    }
    fetchCount()
  }, [])

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
          onClick={onApply}
          className="block w-full bg-brand-clay text-white py-3 text-[13px] uppercase tracking-wider font-medium text-center hover:bg-brand-clay-hover transition-all"
        >
          Занять место {spotsOccupied !== null ? `· ${spotsOccupied} из ${TOTAL_SPOTS}` : ''}
        </button>
      </div>
    </div>
  )
}
