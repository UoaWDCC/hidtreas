import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import MeetTheTeam from '@/components/AboutUs/MeetTheTeam'

export default async function AboutPage() {
  return (
    <div className="home">
      <Header />

      <MeetTheTeam />

      <Footer />
    </div>
  )
}
