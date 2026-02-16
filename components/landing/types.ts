export interface PainPoint {
  text: string
  icon: string
}

export interface SciencePoint {
  title: string
  description: string
  iconName: 'brain' | 'heart' | 'activity'
}

export interface RetreatDay {
  day: number
  title: string
  subtitle: string
  description: string
  practices: string[]
  schedule?: string[]
  emotionalArc?: string
}

export interface Practice {
  name: string
  description: string
}

export interface Testimonial {
  name: string
  city?: string
  text: string
  beforeText?: string
  resultHighlight?: string
  videoUrl?: string
  image?: string
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
  evidence: string
  iconName: 'move' | 'wind' | 'volume-2'
}

export interface VenueFeature {
  text: string
  icon: string
}

export interface VenueRoom {
  name: string
  floor: number
  beds: number
  features: string
  image: string
}

export interface VenueRooms {
  suites: VenueRoom[]
  shared: VenueRoom[]
  facilitator: { description: string; image: string }
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  category?: 'process' | 'connection' | 'joy'
}
