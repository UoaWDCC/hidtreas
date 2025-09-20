import './global.css'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeAre from '@/components/home/WhoWeAre'
import Events from '@/components/home/Events'

export default async function HomePage() {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <Events />
      <WhoWeAre />
      <WhatWeDo />
      <Footer />
    </div>
  )
}
