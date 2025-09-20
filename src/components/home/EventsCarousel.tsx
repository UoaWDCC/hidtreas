'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SignUpModal from '../events/EventsSignUpModal'

type EventType = {
  id: string
  name: string
  hosted_by?: string
  description: string
  date?: string
  image?: string
}

export default function ImageCarousel() {
  const [signOpen, setSignOpen] = useState(false)
  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data.events))
  }, [])

  return (
    <div className="w-[100vh] max-w-full overflow-x-auto py-4">
      <div className="flex gap-8 lg:px-8 sm:px-8 snap-x snap-mandatory">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-[60vw] sm:w-[40vw] md:w-[25vw] h-[50vh] snap-center relative rounded-xl overflow-hidden shadow-lg"
          >
            <Image src={event.image || ''} alt={event.name} fill className="object-cover" />
          </div>
        ))}

        {/* Sign-Up Box as the last slide */}
        <div className="flex-shrink-0 w-[60vw] sm:w-[40vw] md:w-[25vw] h-[50vh] snap-center flex flex-col items-center justify-center rounded-xl bg-[#13384E] text-white shadow-lg">
          <h1>WANT MORE EVENTS LIKE THESE?</h1>
          <p>Stay in touch and never miss out!</p>
          <button
            onClick={() => setSignOpen(true)}
            className="px-6 py-3 bg-white text-[#13384E] font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Join Us
          </button>
        </div>
      </div>
      <SignUpModal setSignOpen={setSignOpen} signOpen={signOpen} />
    </div>
  )
}
