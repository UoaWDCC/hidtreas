import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/events/Hero'
import EventsSignUpModal from '@/components/events/EventsSignUpModal'
import RecentEvents from '@/components/events/RecentEvents'
import PastEventsSection from '@/components/events/PastEventsSection'
import PastEventsPopUpModal from '@/components/events/PastEventsPopUpModal'
import { getPastEvents, getUpcomingEvents } from '@/lib/payload/events'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const upcoming = await getUpcomingEvents(5)
  const past = await getPastEvents()

  return (
    <div className="home">
      <Header />
      <Hero />
      <RecentEvents initialEvents={upcoming} />
      <PastEventsSection initialEvents={past} />
      <Footer />
    </div>
  )
}
