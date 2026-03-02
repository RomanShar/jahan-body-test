import HeroSection from '@/components/landing/HeroSection'
import EmbodiedIntimacySection from '@/components/landing/EmbodiedIntimacySection'
import ForWhomSection from '@/components/landing/ForWhomSection'
import PainPointsSection from '@/components/landing/PainPointsSection'
import ManifestoSection from '@/components/landing/ManifestoSection'
import ResultsSection from '@/components/landing/ResultsSection'
import FacilitatorSection from '@/components/landing/FacilitatorSection'
import CoupleSection from '@/components/landing/CoupleSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import RetreatSection from '@/components/landing/RetreatSection'
import SafetySection from '@/components/landing/SafetySection'
import VenueSection from '@/components/landing/VenueSection'
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
        <EmbodiedIntimacySection />
        <ForWhomSection />
        <PainPointsSection />
        <ResultsSection />
        <ManifestoSection />
        <VideoBreak />
        <FacilitatorSection />
        <CoupleSection />
        <TestimonialsSection />
        <PhotoBreak
          src="/images/landing/breaks/embrace.webp"
          alt="Близость и доверие на тренинге"
        />
        <RetreatSection />
        <SafetySection />
        <VenueSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </ModalProvider>
  )
}
