import { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import MeetTheTeam from '@/components/AboutUs/MeetTheTeam'
import Hero from '@/components/about/Hero'
import Descriptions from '@/components/about/Descriptions'
import MeetTheWDCCTeam from '@/components/about/MeetTheWDCCTeam'
import QuotesSection from '@/components/about/QuotesSection'
import { getAboutPageImages } from '@/lib/payload/images'
import { getMembers } from '@/lib/payload/members'

// ISR: Revalidate every 5 minutes for fresh content while keeping pages static
export const revalidate = 300

// ✅ Loading fallback
function SectionSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  )
}

// ✅ Parallel data fetching - all requests start simultaneously
async function AboutContent() {
  const [heroImage, descriptionImage1, descriptionImage2, quoteImage, members] = await Promise.all([
    getAboutPageImages('hero'),
    getAboutPageImages('description-1'),
    getAboutPageImages('description-2'),
    getAboutPageImages('quote'),
    getMembers(),
  ])

  return (
    <>
      <Hero heroImage={heroImage} />
      <Descriptions descriptionImage1={descriptionImage1} descriptionImage2={descriptionImage2} />
      <MeetTheTeam members={members} />
      <QuotesSection quoteImage={quoteImage} />
    </>
  )
}

export default function AboutPage() {
  return (
    <div className="home">
      <Header />

      <Suspense
        fallback={
          <>
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
          </>
        }
      >
        <AboutContent />
      </Suspense>

      <MeetTheWDCCTeam />
      <Footer />
    </div>
  )
}
