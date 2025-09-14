'use client'

import { useState } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/events/Hero'
import EventsSignUpModal from '@/components/events/EventsSignUpModal'
import RecentEvents from '@/components/events/RecentEvents'
import PastEventsSection from '@/components/events/PastEventsSection'
import PastEventsPopUpModal from '@/components/events/PastEventsPopUpModal'

export default function EventsPage() {
  const [signOpen, setSignOpen] = useState(false)

  return (
    <div className="home">
      <Header />
      <Hero />
      <RecentEvents />
      <PastEventsSection />
      <Footer />
      <EventsSignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
      <PastEventsPopUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
    </div>
  )
}
