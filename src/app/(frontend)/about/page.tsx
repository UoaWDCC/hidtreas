import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/about/Hero'
import Descriptions from '@/components/about/Descriptions'

export default async function AboutPage() {
  return (
    <div className="home">
      <Header />
      <Hero />
      <Descriptions />
      <Footer />
    </div>
  )
}