'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { X, ChevronUp, ChevronDown, Play, Volume2, VolumeX } from 'lucide-react'
import type { VideoTestimonial } from './types'

interface VideoReelsViewerProps {
  videos: VideoTestimonial[]
  startIndex: number
  onClose: () => void
}

export default function VideoReelsViewer({ videos, startIndex, onClose }: VideoReelsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchStartY = useRef<number | null>(null)

  const video = videos[currentIndex]
  const hasVideo = !!video.videoUrl

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1))
  }, [videos.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  useEffect(() => {
    if (videoRef.current && hasVideo) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [currentIndex, hasVideo])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const diff = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext()
      else goPrev()
    }
    touchStartY.current = null
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Видео-отзывы"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Circle video container */}
        <div className="relative w-[80vw] h-[80vw] max-w-[400px] max-h-[400px] rounded-full overflow-hidden ring-4 ring-white/20">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={video.videoUrl}
              className="w-full h-full object-cover"
              playsInline
              muted={muted}
              loop
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-dark">
              <Play className="w-16 h-16 text-white/40 ml-2" />
            </div>
          )}
        </div>

        {/* Quote below circle */}
        <div className="mt-6 px-8 text-center max-w-md">
          <p className="text-white/90 text-base sm:text-lg italic leading-relaxed">
            &laquo;{video.quote}&raquo;
          </p>
          <p className="text-white/50 text-sm mt-3">
            {video.name} &middot; {currentIndex + 1}/{videos.length}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mute toggle */}
        {hasVideo && (
          <button
            onClick={() => setMuted(!muted)}
            className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition"
            aria-label={muted ? 'Включить звук' : 'Выключить звук'}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        )}

        {/* Navigation */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="absolute left-2 sm:left-8 top-[calc(50%-40px)] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition disabled:opacity-20"
          aria-label="Предыдущее видео"
        >
          <ChevronUp className="w-5 h-5 -rotate-90" />
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === videos.length - 1}
          className="absolute right-2 sm:right-8 top-[calc(50%-40px)] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition disabled:opacity-20"
          aria-label="Следующее видео"
        >
          <ChevronDown className="w-5 h-5 -rotate-90" />
        </button>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all ${
                i === currentIndex
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Видео ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
