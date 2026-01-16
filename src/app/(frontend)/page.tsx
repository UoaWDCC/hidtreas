import './global.css'
import { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeAre from '@/components/home/WhoWeAre'
import Events from '@/components/home/Events'
import { getPastEvents, getUpcomingEvents } from '@/lib/payload/events'
import { getHomePageImages } from '@/lib/payload/images'

// ISR: Revalidate every 5 minutes for fresh content while keeping pages static
export const revalidate = 300

// ✅ Loading fallbacks for each section
function HeroSkeleton() {
  return (
    <div className="px-4 sm:px-[3vw] py-4 sm:py-[1vw]">
      <div className="relative rounded-b-[4vw] overflow-hidden w-full sm:w-[95%] mx-auto h-[70vh] sm:h-[85vh] md:h-[40vw] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
    </div>
  )
}

function SectionSkeleton() {
  return (
    <div className="py-12 sm:py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-8 animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

// ✅ Parallel data fetching - all requests start simultaneously
async function HomeContent() {
  // Fetch all data in parallel for faster page load
  const [heroImage, whoWeAreImage, whatWeDoImage, upcoming] = await Promise.all([
    getHomePageImages('hero'),
    getHomePageImages('who-we-are'),
    getHomePageImages('what-we-do'),
    getUpcomingEvents(5),
  ])

  return (
    <>
      <HeroSection heroImage={heroImage} />
      <WhoWeAre whoWeAreImage={whoWeAreImage} />
      <WhatWeDo whatWeDoImage={whatWeDoImage} />
      <Events initialEvents={upcoming} />
    </>
  )
}

export default function HomePage() {
  return (
    <div className="home">
      <Header />

      <Suspense
        fallback={
          <>
            <HeroSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
          </>
        }
      >
        <HomeContent />
      </Suspense>

      <Footer />
    </div>
  )
}
