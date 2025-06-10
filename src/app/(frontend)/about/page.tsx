import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

// About Us sections
import MeetTheWDCCTeam from '@/components/about/MeetTheWDCCTeam'
import QuotesSection from '@/components/about/QuotesSection'

export default async function AboutPage() {
  return (
    <div className="home">
      <Header />

      {/* About Us content sections */}
      <QuotesSection />
      <MeetTheWDCCTeam />

      <Footer />
    </div>
  )
}
