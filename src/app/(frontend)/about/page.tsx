import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import MeetTheTeam from '@/components/AboutUs/MeetTheTeam'
import Hero from '@/components/about/Hero'
import Descriptions from '@/components/about/Descriptions'
import MeetTheWDCCTeam from '@/components/about/MeetTheWDCCTeam'
import QuotesSection from '@/components/about/QuotesSection'
import { getAboutPageImages } from '@/lib/payload/images'

export default async function AboutPage() {
  const [heroImage, descriptionImage1, descriptionImage2, quoteImage] = await Promise.all([
    getAboutPageImages('hero'),
    getAboutPageImages('description-1'),
    getAboutPageImages('description-2'),
    getAboutPageImages('quote'),
  ])

  return (
    <div className="home">
      <Header />
      <Hero heroImage={heroImage} />
      <Descriptions descriptionImage1={descriptionImage1} descriptionImage2={descriptionImage2} />
      <MeetTheTeam />
      <QuotesSection quoteImage={quoteImage} />
      <MeetTheWDCCTeam />
      <Footer />
    </div>
  )
}
