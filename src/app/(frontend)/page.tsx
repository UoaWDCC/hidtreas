import './global.css'
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

export default async function HomePage() {
  const upcoming = await getUpcomingEvents(5)
  const past = await getPastEvents()

  const [heroImage, whatWeDoImage, whoWeAreImage] = await Promise.all([
    getHomePageImages('hero'),
    getHomePageImages('what-we-do'),
    getHomePageImages('who-we-are'),
  ])
  return (
    <div className="home">
      <Header />
      <HeroSection heroImage={heroImage} />
      <WhoWeAre whoWeAreImage={whoWeAreImage} />
      <WhatWeDo whatWeDoImage={whatWeDoImage} />
      <Events initialEvents={upcoming} />
      <Footer />
    </div>
  )
}
