import { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import MeetTheTeam from '@/components/about/MeetTheTeam'
import Hero from '@/components/about/Hero'
import Descriptions from '@/components/about/Descriptions'
import MeetTheWDCCTeam from '@/components/about/MeetTheWDCCTeam'
import QuotesSection from '@/components/about/QuotesSection'
import { getAllAboutPageImages } from '@/lib/payload/images'
import { getMembers } from '@/lib/payload/members'

// ISR: Revalidate every 30 minutes — content changes infrequently
export const revalidate = 1800

function SectionSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  )
}

async function AboutContent() {
  // Fetch images in one query + members in parallel (2 DB queries instead of 5)
  const [allImages, members] = await Promise.all([getAllAboutPageImages(), getMembers()])

  // Filter by placement in memory — instant, no extra DB round-trips
  const heroImage = allImages.filter((img) => img.placement === 'hero')
  const descriptionImage1 = allImages.filter((img) => img.placement === 'description-1')
  const descriptionImage2 = allImages.filter((img) => img.placement === 'description-2')
  const quoteImage = allImages.filter((img) => img.placement === 'quote')

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
