'use client'
import Image from 'next/image'
import { useState } from 'react'
import { gallerySection, galleryImages } from './constants'

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  return (
    <section className="bg-white py-20 sm:py-28 px-6" id="gallery">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          {gallerySection.headline}
        </h2>
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12">
          {gallerySection.description}
        </p>

        {/* Grid: 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, i) => (
            <div
              key={i}
              onClick={() => {
                setLightboxIndex(i)
                setLightboxOpen(true)
              }}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox for fullscreen view */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[90vh]"
              />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:scale-110 transition"
                aria-label="Close lightbox"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
