import { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/events/Hero'
import RecentEvents from '@/components/events/RecentEvents'
import PastEventsSection from '@/components/events/PastEventsSection'
import { getPastEvents, getUpcomingEvents } from '@/lib/payload/events'

// Use dynamic rendering to avoid build-time fetch errors, but cache for 5 minutes in production
export const dynamic = 'force-dynamic'
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

// ✅ Independent async components
async function RecentEventsContent() {
  const upcoming = await getUpcomingEvents(5)
  return <RecentEvents initialEvents={upcoming} />
}

async function PastEventsContent() {
  const past = await getPastEvents()
  return <PastEventsSection initialEvents={past} />
}

export default function EventsPage() {
  return (
    <div className="home">
      <Header />
      <Hero />

      <Suspense fallback={<EventsSkeleton />}>
        <RecentEventsContent />
      </Suspense>

      <Suspense fallback={<EventsSkeleton />}>
        <PastEventsContent />
      </Suspense>

      <Footer />
    </div>
  )
}
