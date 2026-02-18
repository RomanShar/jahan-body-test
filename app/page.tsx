'use client'

import { useState } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import SocialProofBar from '@/components/landing/SocialProofBar'
import PainPointsSection from '@/components/landing/PainPointsSection'
import ManifestoSection from '@/components/landing/ManifestoSection'
import PhilosophySection from '@/components/landing/PhilosophySection'
import ScienceSection from '@/components/landing/ScienceSection'
import ResultsSection from '@/components/landing/ResultsSection'
import FacilitatorSection from '@/components/landing/FacilitatorSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import RetreatSection from '@/components/landing/RetreatSection'
import SafetySection from '@/components/landing/SafetySection'
import VenueSection from '@/components/landing/VenueSection'
import GallerySection from '@/components/landing/GallerySection'
import TargetAudienceSection from '@/components/landing/TargetAudienceSection'
import PricingSection from '@/components/landing/PricingSection'
import FAQSection from '@/components/landing/FAQSection'
import FinalCTASection from '@/components/landing/FinalCTASection'
import Footer from '@/components/landing/Footer'
import StickyHeader from '@/components/landing/StickyHeader'
import MobileCTABar from '@/components/landing/MobileCTABar'
import ApplicationModal from '@/components/landing/ApplicationModal'
import StructuredData from '@/components/landing/StructuredData'
import PhotoBreak from '@/components/landing/PhotoBreak'
import VideoBreak from '@/components/landing/VideoBreak'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <StructuredData />
      <a href="#main-content" className="skip-to-main">
        Перейти к содержимому
      </a>
      <StickyHeader onApply={openModal} />
      <MobileCTABar onApply={openModal} />
      <main id="main-content">
        <HeroSection onApply={openModal} />
        <SocialProofBar />
        <PainPointsSection onApply={openModal} />
        <ManifestoSection />
        <PhilosophySection />
        <ScienceSection />
        <ResultsSection />
        <VideoBreak />
        <FacilitatorSection />
        <TestimonialsSection onApply={openModal} />
        <PhotoBreak
          src="/images/landing/breaks/embrace.webp"
          alt="Близость и доверие на тренинге"
        />
        <RetreatSection />
        <SafetySection />
        <VenueSection />
        <GallerySection />
        <PhotoBreak
          src="/images/landing/breaks/beach-golden.webp"
          alt="Практика на берегу океана"
        />
        <TargetAudienceSection />
        <PricingSection onApply={openModal} />
        <FAQSection />
        <FinalCTASection onApply={openModal} />
      </main>
      <Footer />
      <ApplicationModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}
