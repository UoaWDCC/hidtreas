import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import PastEventsSection from '@/components/events/PastEventsSection'

export default async function EventsPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <PastEventsSection />
      <Footer />
    </div>
  )
}
