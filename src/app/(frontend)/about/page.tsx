import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/about/Hero'
import Descriptions from '@/components/about/Descriptions'
import MeetTheWDCCTeam from '@/components/about/MeetTheWDCCTeam'
import QuotesSection from '@/components/about/QuotesSection'

export default async function AboutPage() {
  return (
    <div className="home">
      <Header />
      <Hero />
      <Descriptions />
      <QuotesSection />
      <MeetTheWDCCTeam />
      <Footer />
    </div>
  )
}
