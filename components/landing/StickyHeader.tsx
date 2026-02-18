'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from './constants'
import { useModal } from './ModalProvider'

export default function StickyHeader() {
  const { openModal } = useModal()
  const [visible, setVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const isVisible = window.scrollY > window.innerHeight * 0.4
        setVisible(isVisible)
        if (!isVisible) setMobileMenuOpen(false)
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (href?.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-brand-body/92 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-brand-dark uppercase tracking-[0.2em] font-bold text-sm">
            Суперблизость
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={smoothScroll}
                className="text-brand-muted hover:text-brand-dark transition text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="bg-brand-clay text-white px-5 py-2 text-[13px] uppercase tracking-wider font-medium hover:bg-brand-clay-hover transition-all"
            >
              Занять место
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-brand-muted hover:text-brand-dark transition"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-brand-body/95 backdrop-blur-md border-b border-brand-border overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-80' : 'max-h-0'
        }`}
        role="region"
        aria-label="Мобильное меню"
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={(e) => { smoothScroll(e); setMobileMenuOpen(false) }}
              className="block py-3 text-brand-muted hover:text-brand-dark transition text-base border-b border-brand-border last:border-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
