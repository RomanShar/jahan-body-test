export interface PainPoint {
  title: string
  text: string
  icon: string
}

export interface RetreatDay {
  day: number
  title: string
  subtitle: string
  description: string
  practices: string[]
  emotionalArc?: string
  image?: string
}

export interface Testimonial {
  name: string
  text: string
  resultHighlight?: string
  image?: string
  featured?: boolean
}

export interface VideoTestimonial {
  name: string
  quote: string
  duration: string
  videoUrl?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface PricingIncluded {
  text: string
  included: boolean
}

export interface PricingTier {
  name: string
  description: string
  price: string
  earlyBird?: string
  highlight: boolean
}

export interface PhilosophyPillar {
  name: string
  quote: string
  iconName: 'move' | 'wind' | 'volume-2'
}

export interface VenueHighlight {
  image: string
  label: string
  alt: string
}

export interface AccommodationTier {
  name: string
  description: string
  image: string
  alt: string
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  category?: 'process' | 'connection' | 'joy'
  featured?: boolean
}

export interface ManifestoData {
  quote: string
  author: string
}
