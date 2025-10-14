'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import SignUpModal from '@/components/events/EventsSignUpModal'
import Koru from '@/assets/recent_events_koru.png'
import KiwiBird from '@/assets/kiwiBird.svg'
import { Kosugi_Maru } from 'next/font/google'
import type { EventType } from '@/types/event'

const kosugiMaru = Kosugi_Maru({ subsets: ['latin'], weight: '400' })

export default function RecentEvents({ initialEvents }: { initialEvents: EventType[] }) {
  const [eventToSignUp, setEventToSignUp] = useState({ title: '', id: '' })
  const [signOpen, setSignOpen] = useState(false)
  const events = initialEvents
  const eventNames = events.map((e) => e.title)

  return (
    <>
      {/* Koru decoration */}
      <div className="pt-15 relative overflow-visible hidden md:block">
        <Image
          src={Koru}
          alt="Koru decoration"
          className="absolute -left-10 -top-12 w-[15%] max-w-[160px] h-auto pointer-events-none rotate-[20deg]"
        />
      </div>

      {/* Header Bar */}
      <div
        className="w-[45%] bg-[#13384E] rounded-t-2xl flex items-center justify-center"
        style={{ height: '5rem' }}
      >
        <h2 className="text-white text-base md:text-2xl lg:text-3xl font-semibold">
          UPCOMING EVENTS
        </h2>
      </div>

      {/* Main Content */}
      <section className="relative w-full bg-[#13384E] px-6 pt-0 pb-12 overflow-x-hidden">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row items-start pt-10 pl-4 sm:pl-8 md:pl-12 lg:pl-20 gap-6 md:gap-10 lg:gap-20 mb-10"
          >
            <div className="relative w-full max-w-[70%] md:max-w-[400px] h-auto">
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={400}
                height={300}
                className="w-[400px] h-[300px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-0 left-0 bg-[#13384E] text-white px-5 py-3 text-lg font-semibold rounded-br-xl">
                {event.date.toLocaleDateString('en-NZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              {/* Decoration: red circle (first) or kiwi (second) */}
              {idx === 0 ? (
                <div className="absolute rounded-full bg-[#eb5454] w-8 h-8 bottom-[-16px] left-[-16px] md:w-15 md:h-15 md:bottom-[-20px] md:left-[-20px] lg:w-20 lg:h-20 lg:bottom-[-24px] lg:left-[-24px]" />
              ) : (
                <div className="absolute bottom-[-16px] right-[-16px] md:bottom-[-20px] md:right-[-20px] lg:bottom-[-24px] lg:right-[-24px] w-8 h-8 md:w-15 md:h-15 lg:w-20 lg:h-20 flex items-center justify-center">
                  <Image
                    src={KiwiBird}
                    alt="Kiwi decoration"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="text-white max-w-xl">
              <h2 className={`text-2xl md:text-3xl font-semibold mb-2 ${kosugiMaru.className}`}>
                {event.title}
              </h2>
              <h3 className="text-base md:text-lg font-medium mb-4">HOSTED BY: {event.hostedBy}</h3>
              <p className={`text-sm md:text-base leading-relaxed ${kosugiMaru.className}`}>
                {event.description}
              </p>
              <button
                onClick={() => {
                  setEventToSignUp({ title: event.title, id: event.id })
                  setSignOpen(true)
                }}
                className="mt-10 px-6 py-2 bg-white text-[#13384E] font-semibold rounded-xl shadow hover:bg-gray-200 transition hover:cursor-pointer"
              >
                SIGN UP HERE
              </button>
            </div>
          </div>
        ))}
      </section>

      <SignUpModal
        signOpen={signOpen}
        setSignOpen={setSignOpen}
        eventOptions={eventNames}
        eventToSignUp={eventToSignUp}
      />
    </>
  )
}
