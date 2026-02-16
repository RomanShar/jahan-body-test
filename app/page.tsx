'use client'

import { useState } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import SocialProofBar from '@/components/landing/SocialProofBar'
import PainPointsSection from '@/components/landing/PainPointsSection'
import DevaluationSection from '@/components/landing/DevaluationSection'
import TargetAudienceSection from '@/components/landing/TargetAudienceSection'
import PhilosophySection from '@/components/landing/PhilosophySection'
import TestCTASection from '@/components/landing/TestCTASection'
import FacilitatorSection from '@/components/landing/FacilitatorSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import RetreatSection from '@/components/landing/RetreatSection'
import VenueSection from '@/components/landing/VenueSection'
import PricingSection from '@/components/landing/PricingSection'
import FAQSection from '@/components/landing/FAQSection'
import FinalCTASection from '@/components/landing/FinalCTASection'
import Footer from '@/components/landing/Footer'
import StickyHeader from '@/components/landing/StickyHeader'
import MobileCTABar from '@/components/landing/MobileCTABar'
import ApplicationModal from '@/components/landing/ApplicationModal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <StickyHeader onApply={openModal} />
      <MobileCTABar onApply={openModal} />
      <main>
        <HeroSection onApply={openModal} />
        <SocialProofBar />
        <PainPointsSection />
        <DevaluationSection />
        <TargetAudienceSection />
        <PhilosophySection />
        <FacilitatorSection />
        <TestimonialsSection />
        <RetreatSection />
        <VenueSection />
        <PricingSection onApply={openModal} />
        <FAQSection />
        <TestCTASection />
        <FinalCTASection onApply={openModal} />
      </main>
      <Footer />
      <ApplicationModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}
