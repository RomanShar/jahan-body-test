'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navItems } from './constants'

interface StickyHeaderProps {
  onApply: () => void
}

export default function StickyHeader({ onApply }: StickyHeaderProps) {
  const [visible, setVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = window.scrollY > window.innerHeight * 0.8
      setVisible(isVisible)
      if (!isVisible) setMobileMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-brand-dark/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-white font-bold text-lg">
            Безопасно быть близко
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white transition text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA */}
            <button
              onClick={onApply}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Оставить заявку
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-brand-dark/95 backdrop-blur-md border-b border-white/5 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-gray-300 hover:text-white transition text-base border-b border-white/5 last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/test"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-purple-400 hover:text-purple-300 transition text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
          >
            Тест тела
          </Link>
        </nav>
      </div>
    </header>
  )
}
