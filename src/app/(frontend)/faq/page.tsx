import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/faq/HeroSection'
import FAQ from '@/components/faq/FAQ'

export default function FAQPage() {
  return (
    <div className="faq">
      <Header />
      <HeroSection />
      <FAQ />
      <Footer />
    </div>
  )
}
