import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/events/Hero'
import EventsSignUpModal from '@/components/events/EventsSignUpModal'
import RecentEvents from '@/components/events/RecentEvents'
import PastEventsSection from '@/components/events/PastEventsSection'
import PastEventsPopUpModal from '@/components/events/PastEventsPopUpModal'
import {getPastEvents, getUpcomingEvents} from "@/lib/payload/events";

export default async function EventsPage() {
  const upcoming = await getUpcomingEvents()
  const past = await getPastEvents()

  return (
    <div className="home">
      <Header />
      <Hero />
      <RecentEvents initialEvents={upcoming}/>
      <PastEventsSection initialEvents={past}/>
      <Footer />
      <EventsSignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
      <PastEventsPopUpModal
        signOpen={signOpen}
        setSignOpen={setSignOpen}
        events={[]}
        initialIdx={0}
      />
    </div>
  )
}
