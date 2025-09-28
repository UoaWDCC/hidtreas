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
    <div className="w-screen max-w-full overflow-x-auto py-4">
      <div className="flex gap-8 lg:px-8 sm:px-8 snap-x snap-mandatory">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="group flex-shrink-0 w-[60vw] sm:w-[40vw] md:w-[25vw] h-[50vh] snap-center relative rounded-xl overflow-hidden shadow-lg"
          >
            {/* Image */}
            <Image src={event.image || ''} alt={event.name} fill className="object-cover" />

            {/* Info strip */}
            <div className=" absolute bottom-0 left-0 w-full overflow-y-auto max-w-full h-[60%] bg-[#fdf4ed] text-[#13384e] flex flex-col p-5 overflow-x-auto justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h1 className="font-bold text-3xl">{event.name}</h1>
              <h1 className="text-lg pt-2 pb-2">{event.description}</h1>
              <button
                onClick={() => setSignOpen(true)}
                className="px-6 py-3 outline-solid font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Join Us
              </button>
            </div>
          </div>
        ))}

        {/* Sign-Up Box as the last slide */}
        <div className="flex-shrink-0 w-[60vw] gap-10 sm:w-[40vw] md:w-[25vw] h-[50vh] snap-center flex flex-col items-center justify-center rounded-xl bg-[#13384E] text-white shadow-lg text-center">
          <h1 className="text-4xl font-bold">WANT MORE EVENTS LIKE THESE?</h1>
          <p>Stay in touch and never miss out!</p>
          <button
            onClick={() => setSignOpen(true)}
            className="px-6 py-3 outline-solid w-[80%] text-[#fff] font-semibold rounded-lg hover:bg-[#1c5370c1] transition"
          >
            Join Us
          </button>
        </div>
      </div>
      <SignUpModal setSignOpen={setSignOpen} signOpen={signOpen} />
    </div>
  )
}
