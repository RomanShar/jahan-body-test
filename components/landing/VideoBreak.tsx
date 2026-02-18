'use client'

import { useRef, useEffect } from 'react'

const VIDEOS = [
  { src: '/videos/break/dance-alt.mp4', label: 'Танец' },
  { src: '/videos/break/happy-dance-2.mp4', label: 'Экстаз' },
  { src: '/videos/break/sitting.mp4', label: 'Медитация' },
  { src: '/videos/break/lying-practice.mp4', label: 'Практика' },
]

function MiniVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.play().catch(() => {})
        } else {
          ref.current?.pause()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-auto md:flex-1 aspect-[3/4] relative overflow-hidden rounded-sm">
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <p className="absolute bottom-3 left-4 text-white font-serif text-base drop-shadow-md">
        {label}
      </p>
    </div>
  )
}

export default function VideoBreak() {
  return (
    <div className="w-full bg-black py-2">
      {/* Mobile: horizontal scroll | Desktop: 4 columns */}
      <div className="flex md:grid md:grid-cols-4 gap-2 overflow-x-auto md:overflow-visible px-2 md:px-0 scrollbar-hide">
        {VIDEOS.map((v) => (
          <MiniVideo key={v.src} src={v.src} label={v.label} />
        ))}
      </div>
    </div>
  )
}
