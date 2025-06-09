import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import RecentEvents from '@/components/events/RecentEvents'

export default async function EventsPage() {
  return (
    <div>
      <Header />

      <RecentEvents />

      <Footer />
    </div>
  )
}
