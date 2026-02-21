import './global.css'
import { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeAre from '@/components/home/WhoWeAre'
import Events from '@/components/home/Events'
import { getUpcomingEvents } from '@/lib/payload/events'
import { getAllHomePageImages } from '@/lib/payload/images'

// ISR: Revalidate every 30 minutes — content changes infrequently
export const revalidate = 1800

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

async function HomeContent() {
  // Fetch images in one query + events in parallel (2 DB queries instead of 4)
  const [allImages, upcoming] = await Promise.all([getAllHomePageImages(), getUpcomingEvents(5)])

  // Filter by placement in memory — instant, no extra DB round-trips
  const heroImage = allImages.filter((img) => img.placement === 'hero')
  const whoWeAreImage = allImages.filter((img) => img.placement === 'who-we-are')
  const whatWeDoImage = allImages.filter((img) => img.placement === 'what-we-do')

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
