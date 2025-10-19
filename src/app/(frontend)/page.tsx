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

// Use dynamic rendering to avoid build-time fetch errors, but cache for 5 minutes in production
export const dynamic = 'force-dynamic'
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

// ✅ Async Server Components - Each fetches independently!
async function HeroContent() {
  const heroImage = await getHomePageImages('hero')
  return <HeroSection heroImage={heroImage} />
}

async function WhoWeAreContent() {
  const whoWeAreImage = await getHomePageImages('who-we-are')
  return <WhoWeAre whoWeAreImage={whoWeAreImage} />
}

async function WhatWeDoContent() {
  const whatWeDoImage = await getHomePageImages('what-we-do')
  return <WhatWeDo whatWeDoImage={whatWeDoImage} />
}

async function EventsContent() {
  const upcoming = await getUpcomingEvents(5)
  return <Events initialEvents={upcoming} />
}

export default function HomePage() {
  // ✅ NO BLOCKING! Each section streams in as data arrives via React Suspense
  return (
    <div className="home">
      <Header />

      <Suspense fallback={<HeroSkeleton />}>
        <HeroContent />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhoWeAreContent />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhatWeDoContent />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <EventsContent />
      </Suspense>

      <Footer />
    </div>
  )
}
