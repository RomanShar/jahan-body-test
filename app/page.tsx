'use client'

import { useState } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import SocialProofBar from '@/components/landing/SocialProofBar'
import PainPointsSection from '@/components/landing/PainPointsSection'
import DevaluationSection from '@/components/landing/DevaluationSection'
import TargetAudienceSection from '@/components/landing/TargetAudienceSection'
import PhilosophySection from '@/components/landing/PhilosophySection'
import ResultsSection from '@/components/landing/ResultsSection'
import TestCTASection from '@/components/landing/TestCTASection'
import FacilitatorSection from '@/components/landing/FacilitatorSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import RetreatSection from '@/components/landing/RetreatSection'
import VenueSection from '@/components/landing/VenueSection'
import GallerySection from '@/components/landing/GallerySection'
import PricingSection from '@/components/landing/PricingSection'
import FAQSection from '@/components/landing/FAQSection'
import FinalCTASection from '@/components/landing/FinalCTASection'
import Footer from '@/components/landing/Footer'
import StickyHeader from '@/components/landing/StickyHeader'
import MobileCTABar from '@/components/landing/MobileCTABar'
import ApplicationModal from '@/components/landing/ApplicationModal'
import ProcessSection from '@/components/landing/ProcessSection'
import StructuredData from '@/components/landing/StructuredData'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <StructuredData />
      <StickyHeader onApply={openModal} />
      <MobileCTABar onApply={openModal} />
      <main>
        <HeroSection onApply={openModal} />
        <SocialProofBar />
        <PainPointsSection />
        <TargetAudienceSection />
        <DevaluationSection />
        <PhilosophySection />
        <ResultsSection />
        <FacilitatorSection />
        <TestimonialsSection />
        <RetreatSection />
        <VenueSection />
        <GallerySection />
        <ProcessSection />
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
