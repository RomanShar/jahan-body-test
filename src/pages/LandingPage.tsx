import HeroSection from '@/components/landing/HeroSection'
import EmbodiedIntimacySection from '@/components/landing/EmbodiedIntimacySection'
import PhilosophySection from '@/components/landing/PhilosophySection'
import ForWhomSection from '@/components/landing/ForWhomSection'
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
import ModalProvider from '@/components/landing/ModalProvider'

export default function LandingPage() {
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
        <PhilosophySection />
        <ForWhomSection />
        <ResultsSection />
        <RetreatSection />
        <SafetySection />
        <FacilitatorSection />
        <CoupleSection />
        <TestimonialsSection />
        <VenueSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </ModalProvider>
  )
}
