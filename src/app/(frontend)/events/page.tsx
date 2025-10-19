import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/events/Hero'
import EventsSignUpModal from '@/components/events/EventsSignUpModal'
import RecentEvents from '@/components/events/RecentEvents'
import PastEventsSection from '@/components/events/PastEventsSection'
import PastEventsPopUpModal from '@/components/events/PastEventsPopUpModal'
import { getPastEvents, getUpcomingEvents } from '@/lib/payload/events'

// Use dynamic rendering to avoid build-time fetch errors, but cache for 5 minutes in production
export const dynamic = 'force-dynamic'
export const revalidate = 300

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
