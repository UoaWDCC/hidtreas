import './global.css'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeAre from '@/components/home/WhoWeAre'
import EventsTest from '@/components/home/EventsTest'

export default async function HomePage() {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <WhoWeAre />
      <WhatWeDo />
      <EventsTest/>
      <Footer />
    </div>
  )
}
