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
import StructuredData from '@/components/landing/StructuredData'
import PhotoBreak from '@/components/landing/PhotoBreak'
import VideoBreak from '@/components/landing/VideoBreak'
import ModalProvider from '@/components/landing/ModalProvider'

export default function Home() {
  return (
    <ModalProvider>
      <StructuredData />
      <a href="#main-content" className="skip-to-main">
        Перейти к содержимому
      </a>
      <StickyHeader />
      <MobileCTABar />
      <main id="main-content">
        <HeroSection />
        <SocialProofBar />
        <PainPointsSection />
        <ManifestoSection />
        <PhilosophySection />
        <ScienceSection />
        <ResultsSection />
        <VideoBreak />
        <FacilitatorSection />
        <TestimonialsSection />
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
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </ModalProvider>
  )
}
