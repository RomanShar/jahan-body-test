'use client'

import { useState } from 'react'
import StickyHeader from '@/landing-v1/components/landing/StickyHeader'
import MobileCTABar from '@/landing-v1/components/landing/MobileCTABar'
import HeroSection from '@/landing-v1/components/landing/HeroSection'
import SocialProofBar from '@/landing-v1/components/landing/SocialProofBar'
import PainPointsSection from '@/landing-v1/components/landing/PainPointsSection'
import StatsSection from '@/landing-v1/components/landing/StatsSection'
import TargetAudienceSection from '@/landing-v1/components/landing/TargetAudienceSection'
import ScienceSection from '@/landing-v1/components/landing/ScienceSection'
import TestCTASection from '@/landing-v1/components/landing/TestCTASection'
import FacilitatorSection from '@/landing-v1/components/landing/FacilitatorSection'
import TestimonialsSection from '@/landing-v1/components/landing/TestimonialsSection'
import RetreatSection from '@/landing-v1/components/landing/RetreatSection'
import PricingSection from '@/landing-v1/components/landing/PricingSection'
import FAQSection from '@/landing-v1/components/landing/FAQSection'
import FinalCTASection from '@/landing-v1/components/landing/FinalCTASection'
import Footer from '@/landing-v1/components/landing/Footer'
import BookingModal from '@/landing-v1/components/landing/BookingModal'

export default function V1Page() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <StickyHeader />
      <MobileCTABar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <PainPointsSection />
        <StatsSection />
        <TargetAudienceSection />
        <ScienceSection />
        <TestCTASection />
        <FacilitatorSection />
        <TestimonialsSection />
        <RetreatSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
