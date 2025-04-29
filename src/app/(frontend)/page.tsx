import './global.css'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/home/HeroSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import WhoWeAre from '@/components/home/WhoWeAre'

export default async function HomePage() {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <WhatWeDo />
      <WhoWeAre />
      <Footer />
    </div>
  )
}
