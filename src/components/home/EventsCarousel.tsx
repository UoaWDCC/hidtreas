'use client'
import Image from 'next/image'
import { useState } from 'react'
import EventsSignUpModal from '../events/EventsSignUpModal'
import GeneralSignUpModal from '../common/SignUpModal'
import type { EventType } from '@/types/event'

export default function ImageCarousel({ initialEvents }: { initialEvents: EventType[] }) {
  const [eventSignOpen, setEventSignOpen] = useState(false)
  const [generalSignOpen, setGeneralSignOpen] = useState(false)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const events = initialEvents
  const eventNames = events.map((e) => e.title)

  return (
    <div className="w-screen max-w-full overflow-x-auto py-4 pt-10 md:pt-20 sm:pt-25">
      <div className="flex gap-8 lg:px-8 sm:px-8 snap-x snap-mandatory">
        {events.map((event, idx) => {
          const isActive = activeCard === event.id
          const toggleActive = () => {
            setActiveCard((prev) => (prev === event.id ? null : event.id))
          }
          const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if ((e.target as HTMLElement).closest('[data-overlay-interactive]')) {
              return
            }
            toggleActive()
          }
          const overlayVisibilityClasses = isActive
            ? 'opacity-100 pointer-events-auto overflow-y-auto touch-pan-y'
            : 'opacity-0 pointer-events-none'
          const openResponsiveModal = () => {
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              setGeneralSignOpen(true)
            } else {
              setEventSignOpen(true)
            }
          }

          return (
            <div
              key={event.id}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={handleCardClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if ((e.target as HTMLElement).closest('[data-overlay-interactive]')) {
                    return
                  }
                  toggleActive()
                }
              }}
              className="group flex-shrink-0 w-[60vw] sm:w-[44vw] md:w-[28vw] lg:w-[24vw] max-w-[360px] md:max-w-none md:min-w-[280px] lg:min-w-[320px] h-auto min-h-[28vh] sm:min-h-[50vh] md:min-h-[32vh] snap-center relative rounded-xl overflow-hidden shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13384e]"
            >
              {/* Image */}
              <Image src={event.imageUrl || ''} alt={event.title} fill className="object-cover" />

              {/* Info strip */}
              <div
                data-overlay-interactive
                onClick={(event) => event.stopPropagation()}
                onTouchStart={(event) => event.stopPropagation()}
                onTouchMove={(event) => event.stopPropagation()}
                className={`absolute bottom-0 left-0 w-full max-w-full h-[60%] bg-[#fdf4ed] text-[#13384e] flex flex-col p-3 sm:p-5 overflow-x-hidden justify-start transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto ${overlayVisibilityClasses}`}
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">{event.title}</h1>
                <h1 className="text-sm sm:text-lg pt-2 pb-2">{event.description}</h1>
                <button
                  onClick={openResponsiveModal}
                  className="px-4 py-2 sm:px-6 sm:py-3 outline-solid font-semibold rounded-lg hover:bg-gray-100 transition hover:cursor-pointer text-sm sm:text-base md:text-lg"
                >
                  Join Us
                </button>
              </div>
            </div>
          )
        })}

        {/* Sign-Up Box as the last slide */}
        <div className="flex-shrink-0 gap-4 sm:gap-6 w-[55vw] sm:w-[40vw] md:w-[35vw] min-w-[210px] max-w-[340px] md:max-w-[420px] h-auto min-h-[28vh] sm:min-h-[50vh] snap-center flex flex-col items-center justify-center rounded-xl bg-[#13384E] text-white shadow-lg text-center px-4 sm:px-6 py-6">
          <h1 className="text-base sm:text-2xl md:text-3xl font-bold leading-tight">
            WANT MORE EVENTS LIKE THESE?
          </h1>
          <p className="text-xs sm:text-base md:text-lg px-1">Stay in touch and never miss out!</p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setGeneralSignOpen(true)
              } else {
                setEventSignOpen(true)
              }
            }}
            className="px-3 py-2 sm:px-6 sm:py-3 outline-solid w-full max-w-[220px] text-[#fff] font-semibold rounded-lg hover:bg-[#1c5370c1] transition hover:cursor-pointer text-sm sm:text-base md:text-lg"
          >
            Join Us
          </button>
        </div>
      </div>
      <EventsSignUpModal
        setSignOpen={setEventSignOpen}
        signOpen={eventSignOpen}
        eventOptions={eventNames}
      />
      <GeneralSignUpModal signOpen={generalSignOpen} setSignOpen={setGeneralSignOpen} />
    </div>
  )
}
