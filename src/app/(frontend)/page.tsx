import './global.css'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeAre from '@/components/home/WhoWeAre'
import Events from '@/components/home/Events'
import { getPastEvents, getUpcomingEvents } from '@/lib/payload/events'

export default async function HomePage() {
  const upcoming = await getUpcomingEvents(5)
  const past = await getPastEvents()

  return (
    <div className="home">
      <Header />
      <HeroSection />
      <WhoWeAre />
      <WhatWeDo />
      <Events initialEvents={upcoming} />
      <Footer />
    </div>
  )
}
