import EventsCard from '@/components/events/EventsCard'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
export default async function EventsPage() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 place-items-center bg-[#E6E1DE]">
        <EventsCard />
        <EventsCard />
        <EventsCard />
      </div>
      <Footer />
    </div>
  )
}
