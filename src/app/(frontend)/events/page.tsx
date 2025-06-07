import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import YearFilter from '@/components/events/YearFilter'
import PastEvents from '@/components/events/PastEventsGrid'
import Image from 'next/image'
import BlueKoru from '@/assets/blue_koru.png'
import HeroSection from '@/components/home/HeroSection'

export default async function EventsPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <div className="relative py-50">
        <Image
          src={BlueKoru}
          alt="Blue Koru decoration"
          width={256}
          className="absolute -right-10 top-20 rotate-180
          "
        />
        <h3 className="bg-[#E6E1DE] inline text-5xl px-20 py-5 border-none rounded-t-xl font-bold">
          PREVIOUS EVENTS
        </h3>
        <div className="bg-[#E6E1DE] flex flex-col items-center gap-y-10 py-10">
          <YearFilter />
          <PastEvents />
        </div>
      </div>
      <Footer />
    </div>
  )
}
