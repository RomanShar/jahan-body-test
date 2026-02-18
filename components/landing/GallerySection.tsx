'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { gallerySection, galleryImages } from './constants'

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (i: number) => {
    setLightboxIndex(i)
    setLightboxOpen(true)
  }

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, closeLightbox, goNext, goPrev])

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
              {image.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
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
                quality={90}
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

              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
