'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { gallerySection, galleryImages } from './constants'

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const openLightbox = (i: number) => {
    triggerRef.current = i
    setLightboxIndex(i)
    setLightboxOpen(true)
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    if (triggerRef.current !== null) {
      const buttons = document.querySelectorAll<HTMLElement>('#gallery [role="button"]')
      buttons[triggerRef.current]?.focus()
      triggerRef.current = null
    }
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  const lightboxRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Tab') {
        const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    setTimeout(() => lightboxRef.current?.querySelector<HTMLElement>('button')?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, closeLightbox, goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  return (
    <section className="bg-brand-card py-20 sm:py-28 px-6" id="gallery">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4 text-center">
          {gallerySection.headline}
        </h2>
        <p className="text-brand-muted text-lg text-center max-w-2xl mx-auto mb-12">
          {gallerySection.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-3 md:gap-4">
          {galleryImages.map((image, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(i)
                }
              }}
              className={`relative rounded-sm overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 ${
                image.featured ? 'col-span-2 row-span-2' : ''
              }`}
              aria-label={`Открыть фото: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes={image.featured
                  ? '(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw'
                  : '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                }
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            ref={lightboxRef}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фото"
          >
            <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[90vh]"
                sizes="(max-width: 768px) 100vw, 90vw"
                quality={85}
              />

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:scale-110 transition"
                aria-label="Закрыть просмотр"
              >
                ×
              </button>

              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-2xl"
                aria-label="Предыдущее фото"
              >
                ‹
              </button>

              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-2xl"
                aria-label="Следующее фото"
              >
                ›
              </button>

              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm" aria-live="polite" aria-atomic="true">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
