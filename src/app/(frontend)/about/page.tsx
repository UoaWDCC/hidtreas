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

function AboutSkeleton() {
  return (
    <>
      {/* Hero skeleton — half image, half text */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 h-64 md:h-screen bg-gray-200 animate-pulse" />
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full max-w-md bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 max-w-md bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Descriptions skeleton — centered text with small side images */}
      <div className="py-12 flex flex-col items-center px-4">
        <div className="h-16 w-24 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="w-[60%] space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Meet the Team skeleton — heading + grid */}
      <div className="py-8 px-10">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10vw] px-[5vw]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-[clamp(4rem,20vw,10rem)] aspect-[4/5] bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Quotes skeleton — full-width background */}
      <div className="w-full min-h-[70vh] bg-gray-200 animate-pulse" />
    </>
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
        fallback={<AboutSkeleton />}
      >
        <AboutContent />
      </Suspense>

      <MeetTheWDCCTeam />
      <Footer />
    </div>
  )
}
