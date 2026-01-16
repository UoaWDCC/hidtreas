import { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/events/Hero'
import RecentEvents from '@/components/events/RecentEvents'
import PastEventsSection from '@/components/events/PastEventsSection'
import { getPastEvents, getUpcomingEvents } from '@/lib/payload/events'

// ISR: Revalidate every 5 minutes for fresh content while keeping pages static
export const revalidate = 300

// ✅ Loading fallback
function EventsSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

// ✅ Parallel data fetching - both requests start simultaneously
async function EventsContent() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(5), getPastEvents()])

  return (
    <>
      <RecentEvents initialEvents={upcoming} />
      <PastEventsSection initialEvents={past} />
    </>
  )
}

export default function EventsPage() {
  return (
    <div className="home">
      <Header />
      <Hero />

      <Suspense
        fallback={
          <>
            <EventsSkeleton />
            <EventsSkeleton />
          </>
        }
      >
        <EventsContent />
      </Suspense>

      <Footer />
    </div>
  )
}
