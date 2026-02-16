'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { testCTA } from './constants'
import { supabase } from '@/lib/supabase'

export default function TestCTASection() {
  const [leadCount, setLeadCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
        setLeadCount(count || 0)
      } catch {
        // Silently fail — counter just won't show
      }
    }
    fetchCount()
  }, [])

  return (
    <section className="bg-white py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          {testCTA.headline}
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
          {testCTA.description}
        </p>

        {/* Body silhouette */}
        <div className="relative w-48 h-64 mx-auto mb-10" aria-hidden="true">
          <svg
            viewBox="0 0 120 200"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <circle cx="60" cy="25" r="18" className="fill-purple-100 stroke-purple-300" strokeWidth="1.5" />
            {/* Neck */}
            <rect x="54" y="43" width="12" height="10" className="fill-purple-50 stroke-purple-200" strokeWidth="1" />
            {/* Torso */}
            <path d="M35 53 L85 53 L80 120 L40 120 Z" className="fill-purple-50 stroke-purple-200" strokeWidth="1.5" />
            {/* Arms */}
            <path d="M35 55 L15 95 L20 97 L38 62" className="fill-pink-50 stroke-pink-200" strokeWidth="1.5" />
            <path d="M85 55 L105 95 L100 97 L82 62" className="fill-pink-50 stroke-pink-200" strokeWidth="1.5" />
            {/* Legs */}
            <path d="M42 120 L35 185 L45 185 L52 120" className="fill-purple-50 stroke-purple-200" strokeWidth="1.5" />
            <path d="M68 120 L75 185 L85 185 L78 120" className="fill-purple-50 stroke-purple-200" strokeWidth="1.5" />
            {/* Glow dots for block zones */}
            <circle cx="60" cy="25" r="4" className="fill-red-400 animate-pulse-slow opacity-60" />
            <circle cx="60" cy="65" r="4" className="fill-orange-400 animate-pulse-slow opacity-60" />
            <circle cx="60" cy="85" r="4" className="fill-yellow-400 animate-pulse-slow opacity-60" />
            <circle cx="60" cy="105" r="4" className="fill-red-400 animate-pulse-slow opacity-60" />
          </svg>
        </div>

        <Link
          href="/test"
          className="inline-block bg-purple-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-lg text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
        >
          {testCTA.button}
        </Link>

        {leadCount !== null && leadCount > 0 && (
          <p className="text-gray-400 text-sm mt-4">
            {testCTA.counter} {leadCount} человек
          </p>
        )}
      </div>
    </section>
  )
}
