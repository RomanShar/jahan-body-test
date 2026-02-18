'use client'

import { useEffect, useRef, useState } from 'react'
import { painPoints, painPointsHeadline, painPointsClosing } from './constants'

const painIcons: Record<string, React.ReactNode> = {
  Lock: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px]">
      <defs><filter id="ink1"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter></defs>
      <g filter="url(#ink1)">
        <path d="M100,100 Q120,80 90,70 T70,110 T130,120 T110,60 T60,90 T90,140 T150,100 T50,80" fill="none" stroke="#C05640" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round"/>
        <path d="M100,100 Q80,130 110,140 T140,90 T80,50 T40,100 T120,150 T160,80" fill="none" stroke="#C05640" strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round"/>
        <circle cx="100" cy="100" r="20" fill="#C05640" fillOpacity="0.1"/>
        <path d="M90,90 L110,110 M110,90 L90,110 M100,80 L100,120 M80,100 L120,100" stroke="#C05640" strokeWidth="0.5"/>
        <path d="M100,20 C144,20 180,56 180,100 C180,144 144,180 100,180 C56,180 20,144 20,100 C20,56 56,20 100,20 Z" fill="none" stroke="#2A2A2A" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="100 20"/>
        <path d="M100,25 C140,25 175,60 175,100 C175,140 140,175 100,175 C60,175 25,140 25,100 C25,60 60,25 100,25 Z" fill="none" stroke="#2A2A2A" strokeWidth="0.5" strokeOpacity="0.5" transform="rotate(-10 100 100)"/>
      </g>
    </svg>
  ),
  Users: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px]">
      <defs><filter id="ink2"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter></defs>
      <g filter="url(#ink2)">
        <circle cx="55" cy="100" r="45" fill="none" stroke="#2A2A2A" strokeWidth="2"/>
        <circle cx="145" cy="100" r="45" fill="none" stroke="#2A2A2A" strokeWidth="2"/>
        <line x1="75" y1="88" x2="88" y2="88" stroke="#C05640" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
        <line x1="112" y1="88" x2="125" y2="88" stroke="#C05640" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
        <line x1="72" y1="100" x2="88" y2="100" stroke="#C05640" strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round"/>
        <line x1="112" y1="100" x2="128" y2="100" stroke="#C05640" strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round"/>
        <line x1="75" y1="112" x2="88" y2="112" stroke="#C05640" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
        <line x1="112" y1="112" x2="125" y2="112" stroke="#C05640" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
      </g>
    </svg>
  ),
  Infinity: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px]">
      <defs><filter id="ink3"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter></defs>
      <g filter="url(#ink3)">
        <path d="M100,100 C100,70 140,50 160,70 C180,90 160,130 100,100 C40,70 20,90 40,130 C60,150 100,130 100,100 Z" fill="none" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round"/>
        <path d="M100,100 C100,60 150,40 170,65 C190,95 155,140 100,100 C45,60 10,95 30,135 C50,160 100,140 100,100 Z" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>
        <path d="M100,100 C100,50 160,30 180,60 C200,100 160,150 100,100 C40,50 0,100 20,140 C40,170 100,150 100,100 Z" fill="none" stroke="#2A2A2A" strokeWidth="0.7" strokeOpacity="0.15" strokeLinecap="round"/>
        <path d="M85,100 L92,100 L95,90 L100,110 L105,100 L115,100" fill="none" stroke="#C05640" strokeWidth="1.2" strokeOpacity="0.2" strokeLinecap="round"/>
      </g>
    </svg>
  ),
  Snowflake: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px]">
      <defs>
        <filter id="ink4"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter>
        <linearGradient id="iceBlock" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7EB3D4" stopOpacity="0.45"/>
          <stop offset="50%" stopColor="#A8D0E8" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#6A9FBF" stopOpacity="0.4"/>
        </linearGradient>
        <pattern id="iceHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.3"/>
        </pattern>
      </defs>
      <g filter="url(#ink4)">
        <rect x="45" y="25" width="110" height="155" rx="3" fill="url(#iceBlock)" stroke="#2A2A2A" strokeWidth="2.2"/>
        <rect x="45" y="25" width="110" height="155" rx="3" fill="url(#iceHatch)" stroke="none"/>
        <rect x="50" y="30" width="100" height="145" rx="2" fill="none" stroke="#5A8FAF" strokeWidth="1" strokeOpacity="0.4"/>
        <path d="M45,70 L68,76 L60,90" fill="none" stroke="#4A7F9F" strokeWidth="1.2" strokeOpacity="0.5"/>
        <path d="M155,55 L135,63 L140,78" fill="none" stroke="#4A7F9F" strokeWidth="1" strokeOpacity="0.45"/>
        <path d="M155,140 L138,134 L143,122" fill="none" stroke="#4A7F9F" strokeWidth="1" strokeOpacity="0.4"/>
        <path d="M45,130 L62,127 L56,115" fill="none" stroke="#4A7F9F" strokeWidth="1" strokeOpacity="0.4"/>
        <path d="M45,100 L65,96 L82,103 L100,97 L118,104 L138,98 L155,100" fill="none" stroke="#4A7F9F" strokeWidth="0.8" strokeOpacity="0.35"/>
        <ellipse cx="60" cy="42" rx="10" ry="5" fill="white" fillOpacity="0.35" transform="rotate(-20 60 42)"/>
        <ellipse cx="70" cy="50" rx="5" ry="2.5" fill="white" fillOpacity="0.2" transform="rotate(-15 70 50)"/>
        <ellipse cx="138" cy="155" rx="7" ry="3" fill="white" fillOpacity="0.2" transform="rotate(15 138 155)"/>
        <circle cx="100" cy="52" r="12" fill="none" stroke="#2A2A2A" strokeWidth="1.8"/>
        <line x1="100" y1="64" x2="100" y2="125" stroke="#2A2A2A" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="100" y1="78" x2="80" y2="105" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="100" y1="78" x2="120" y2="105" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="100" y1="125" x2="92" y2="165" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="100" y1="125" x2="108" y2="165" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="100" y1="22" x2="100" y2="6" stroke="#5A8FAF" strokeWidth="1.2" strokeOpacity="0.5"/>
        <line x1="94" y1="23" x2="86" y2="8" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="106" y1="23" x2="114" y2="8" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="80" y1="24" x2="72" y2="12" stroke="#5A8FAF" strokeWidth="0.5" strokeOpacity="0.25"/>
        <line x1="120" y1="24" x2="128" y2="12" stroke="#5A8FAF" strokeWidth="0.5" strokeOpacity="0.25"/>
        <line x1="42" y1="100" x2="24" y2="100" stroke="#5A8FAF" strokeWidth="1.2" strokeOpacity="0.5"/>
        <line x1="42" y1="90" x2="28" y2="85" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="42" y1="110" x2="28" y2="115" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="43" y1="70" x2="32" y2="65" stroke="#5A8FAF" strokeWidth="0.5" strokeOpacity="0.25"/>
        <line x1="158" y1="100" x2="176" y2="100" stroke="#5A8FAF" strokeWidth="1.2" strokeOpacity="0.5"/>
        <line x1="158" y1="90" x2="172" y2="85" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="158" y1="110" x2="172" y2="115" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="157" y1="70" x2="168" y2="65" stroke="#5A8FAF" strokeWidth="0.5" strokeOpacity="0.25"/>
        <line x1="43" y1="23" x2="30" y2="10" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="157" y1="23" x2="170" y2="10" stroke="#5A8FAF" strokeWidth="0.8" strokeOpacity="0.35"/>
        <line x1="43" y1="182" x2="30" y2="192" stroke="#5A8FAF" strokeWidth="0.5" strokeOpacity="0.25"/>
        <line x1="157" y1="182" x2="170" y2="192" stroke="#5A8FAF" strokeWidth="0.5" strokeOpacity="0.25"/>
      </g>
    </svg>
  ),
  HeartOff: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px]">
      <defs><filter id="ink5"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter></defs>
      <g filter="url(#ink5)">
        <path d="M100,140 C70,120 40,95 40,70 C40,50 55,40 75,40 C88,40 96,48 100,55 C104,48 112,40 125,40 C145,40 160,50 160,70 C160,95 130,120 100,140 Z" fill="#C05640" fillOpacity="0.08" stroke="#C05640" strokeWidth="1" strokeOpacity="0.3"/>
        <line x1="70" y1="30" x2="70" y2="170" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round"/>
        <line x1="100" y1="30" x2="100" y2="170" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round"/>
        <line x1="130" y1="30" x2="130" y2="170" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round"/>
        <line x1="40" y1="70" x2="160" y2="70" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="40" y1="100" x2="160" y2="100" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="40" y1="130" x2="160" y2="130" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  ),
  Shield: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px]">
      <defs><filter id="ink6"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter></defs>
      <g filter="url(#ink6)">
        <rect x="15" y="15" width="170" height="170" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeOpacity="0.2"/>
        <rect x="35" y="35" width="130" height="130" fill="none" stroke="#2A2A2A" strokeWidth="1.2" strokeOpacity="0.3"/>
        <rect x="55" y="55" width="90" height="90" fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeOpacity="0.5"/>
        <rect x="75" y="75" width="50" height="50" fill="none" stroke="#2A2A2A" strokeWidth="2" strokeOpacity="0.7"/>
        <circle cx="100" cy="100" r="5" fill="#C05640" fillOpacity="0.6"/>
        <path d="M35,100 L55,100" stroke="#C05640" strokeWidth="0.8" strokeOpacity="0.4"/>
        <path d="M165,100 L145,100" stroke="#C05640" strokeWidth="0.8" strokeOpacity="0.4"/>
        <path d="M100,35 L100,55" stroke="#C05640" strokeWidth="0.8" strokeOpacity="0.4"/>
        <path d="M100,165 L100,145" stroke="#C05640" strokeWidth="0.8" strokeOpacity="0.4"/>
      </g>
    </svg>
  ),
  Globe: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px]">
      <defs><filter id="ink7"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter></defs>
      <g filter="url(#ink7)">
        <circle cx="100" cy="100" r="70" fill="none" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="100" cy="100" rx="35" ry="70" fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M35,80 Q70,90 100,85 T165,80" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeOpacity="0.6"/>
        <path d="M35,120 Q70,110 100,115 T165,120" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeOpacity="0.6"/>
        <line x1="30" y1="100" x2="170" y2="100" stroke="#2A2A2A" strokeWidth="1" strokeOpacity="0.4"/>
        <path d="M100,30 L100,170" stroke="#2A2A2A" strokeWidth="0.5" strokeOpacity="0.3"/>
        <circle cx="65" cy="85" r="4" fill="#C05640" fillOpacity="0.5"/>
        <path d="M65,85 Q80,75 100,90 T140,95" fill="none" stroke="#C05640" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4"/>
        <circle cx="140" cy="95" r="3" fill="#C05640" fillOpacity="0.4"/>
      </g>
    </svg>
  ),
}

interface PainPointsSectionProps {
  onApply?: () => void
}

export default function PainPointsSection({ onApply }: PainPointsSectionProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-16 text-center">
          {painPointsHeadline}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el }}
              data-index={index}
              className={`bg-brand-card border border-brand-border p-10 transition-[opacity,transform] duration-700 ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                {painIcons[point.icon]}
              </div>
              <h3 className="font-serif text-lg text-brand-dark uppercase tracking-wide mb-3">
                {point.title}
              </h3>
              <p className="text-brand-muted text-[15px] leading-[1.7] font-light">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-brand-muted italic text-[17px] max-w-2xl mx-auto mb-10">
          {painPointsClosing}
        </p>

        {onApply && (
          <div className="text-center">
            <button
              onClick={onApply}
              className="inline-block bg-brand-clay text-white px-10 py-4 text-[13px] uppercase tracking-wider font-medium hover:bg-brand-clay-hover transition-all"
            >
              Узнали себя? → Оставить заявку
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
