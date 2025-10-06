'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SignUpModal from '../events/EventsSignUpModal'
import type { EventType } from '@/types/event'

export default function ImageCarousel({ initialEvents }: { initialEvents: EventType[] }) {
  const [signOpen, setSignOpen] = useState(false)
  const events = initialEvents
  const eventNames = events.map((e) => e.title)

  return (
    <div className="w-screen max-w-full overflow-x-auto py-4">
      <div className="flex gap-8 lg:px-8 sm:px-8 snap-x snap-mandatory">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="group flex-shrink-0 w-[40vw] sm:w-[40vw] md:w-[30vw] h-[30vh] sm:h-[50vh] md:wh-[30vh] snap-center relative rounded-xl overflow-hidden shadow-lg"
          >
            {/* Image */}
            <Image src={event.imageUrl || ''} alt={event.title} fill className="object-cover" />

            {/* Info strip */}
            <div className=" absolute bottom-0 left-0 w-full overflow-y-auto max-w-full h-[60%] bg-[#fdf4ed] text-[#13384e] flex flex-col p-3 sm:p-5 overflow-x-auto justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">{event.title}</h1>
              <h1 className="text-sm sm:text-lg pt-2 pb-2">{event.description}</h1>
              <button
                onClick={() => setSignOpen(true)}
                className="px-4 py-2 sm:px-6 sm:py-3 outline-solid font-semibold rounded-lg hover:bg-gray-100 transition hover:cursor-pointer text-sm sm:text-base md:text-lg"
              >
                Join Us
              </button>
            </div>
          </div>
        ))}

        {/* Sign-Up Box as the last slide */}
        <div className="flex-shrink-0 gap-5 sm:gap-9 w-[40vw] sm:w-[40vw] md:w-[30vw] h-[30vh] sm:h-[50vh] md:wh-[30vh] snap-center flex flex-col items-center justify-center rounded-xl bg-[#13384E] text-white shadow-lg text-center">
          <h1 className="text-1xl sm:text-2xl md:text-3xl pt-2 sm:pt-5 md:pt-1 font-bold">
            WANT MORE EVENTS LIKE THESE?
          </h1>
          <p className="text-sm sm:text-base md:text-lg">Stay in touch and never miss out!</p>
          <button
            onClick={() => setSignOpen(true)}
            className="px-4 py-2 sm:px-6 sm:py-3 outline-solid w-[85%] sm:w-[80%] text-[#fff] font-semibold rounded-lg hover:bg-[#1c5370c1] transition hover:cursor-pointer text-sm sm:text-base md:text-lg"
          >
            Join Us
          </button>
        </div>
      </div>
      <SignUpModal setSignOpen={setSignOpen} signOpen={signOpen} eventOptions={eventNames} />
    </div>
  )
}
