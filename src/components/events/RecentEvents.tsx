'use client'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import SignUpModal from '@/components/events/EventsSignUpModal'
import Koru from '@/assets/recent_events_koru.png'
import KiwiBird from '@/assets/kiwiBird.svg'
import { Kosugi_Maru } from 'next/font/google'
import type { EventType } from '@/types/event'
import Modal from '@/components/common/Modal'
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react'
import AnimatedSection from '@/components/common/AnimatedSection'

const kosugiMaru = Kosugi_Maru({ subsets: ['latin'], weight: '400' })

// Component for truncated description with see more/see less functionality
function TruncatedDescription({
  description,
  maxLength = 200,
}: {
  description: string
  maxLength?: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldTruncate = description.length > maxLength
  const displayText =
    isExpanded || !shouldTruncate ? description : description.slice(0, maxLength) + '...'

  return (
    <div>
      <p className={`text-sm md:text-base leading-relaxed ${kosugiMaru.className}`}>
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm text-white/80 hover:text-white underline transition-colors"
        >
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  )
}

export default function RecentEvents({ initialEvents }: { initialEvents: EventType[] }) {
  const [eventToSignUp, setEventToSignUp] = useState({ title: '', id: '' })
  const [signOpen, setSignOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const events = initialEvents
  const eventNames = events.map((e) => e.title)

  const activeEvent = useMemo(
    () => events.find((event) => event.id === activeEventId) ?? null,
    [activeEventId, events],
  )

  const activeGallery = activeEvent
    ? [activeEvent.imageUrl, ...activeEvent.galleryImages].filter(Boolean)
    : []

  const openGallery = (eventId: string, index = 0) => {
    setActiveEventId(eventId)
    setActiveIndex(index)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
    setActiveEventId(null)
    setActiveIndex(0)
  }

  const goToNext = () => {
    if (!activeGallery.length) return
    setActiveIndex((prev) => (prev + 1) % activeGallery.length)
  }

  const goToPrev = () => {
    if (!activeGallery.length) return
    setActiveIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length)
  }

  return (
    <>
      {/* Koru decoration - outside AnimatedSection to avoid stacking context issues */}
      <div className="pt-15 relative overflow-visible hidden md:block">
        <Image
          src={Koru}
          alt="Koru decoration"
          className="absolute -left-10 -top-12 w-[15%] max-w-[160px] h-auto pointer-events-none z-[9999] animate-fade-in"
          style={{
            animationDelay: '0.1s',
            animationDuration: '1.2s',
            animation: 'bobUpDown 3s ease-in-out infinite, fadeIn 1.2s ease-out 0.1s forwards',
            transform: 'rotate(20deg)',
          }}
        />
      </div>

      {/* Upcoming Events Section - Header and Content together */}
      <AnimatedSection animationClass="animate-slide-in-bottom" delay={0.2}>
        {/* Header Bar */}
        <div
          className="w-[45%] bg-[#13384E] rounded-t-2xl flex items-center justify-center relative z-10"
          style={{ height: '5rem' }}
        >
          <h2 className="text-white text-base md:text-2xl lg:text-3xl font-semibold">
            UPCOMING EVENTS
          </h2>
        </div>

        {/* Main Content */}
        <section
          className="relative w-full bg-[#13384E] px-6 pb-12 overflow-x-hidden"
          style={{ marginTop: '-1px' }}
        >
          {events.map((event, idx) => (
            <AnimatedSection
              key={event.id}
              animationClass="animate-slide-in-bottom"
              delay={0.4 + idx * 0.1}
              className="flex flex-col md:flex-row items-start pt-10 pl-4 sm:pl-8 md:pl-12 lg:pl-20 gap-6 md:gap-10 lg:gap-20 mb-10"
            >
              <div className="relative w-full max-w-[70%] md:max-w-[400px] h-auto group">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={400}
                  height={300}
                  className="w-[400px] h-[300px] object-cover rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => openGallery(event.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openGallery(event.id)
                    }
                  }}
                />
                <div className="absolute top-0 left-0 bg-[#13384E] text-white px-5 py-3 text-lg font-semibold rounded-br-xl transition-all duration-300 group-hover:rounded-xl">
                  {event.date.toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => openGallery(event.id)}
                  className="absolute bottom-[0.45rem] left-1/2 -translate-x-1/2 inline-flex items-center justify-center cursor-pointer sm:bottom-3"
                  aria-label={`Open image gallery for ${event.title}`}
                >
                  <span className="rounded-full bg-white/85 px-[0.36rem] py-[0.16rem] text-center text-[0.48rem] font-semibold uppercase tracking-[0.1em] text-[#13384E] shadow-sm transition-all duration-300 hover:bg-white hover:scale-110 hover:animate-pulse leading-[0.52rem] sm:px-2.5 sm:py-[0.2rem] sm:text-[0.65rem] sm:tracking-[0.2em] sm:leading-tight">
                    Tap to see images
                  </span>
                </button>
                {/* Decoration: red circle (first) or kiwi (second) */}
                {idx === 0 ? (
                  <div className="absolute rounded-full bg-[#eb5454] w-8 h-8 bottom-[-16px] left-[-16px] md:w-15 md:h-15 md:bottom-[-20px] md:left-[-20px] lg:w-20 lg:h-20 lg:bottom-[-24px] lg:left-[-24px] animate-bob" />
                ) : (
                  <div className="absolute bottom-[-16px] right-[-16px] md:bottom-[-20px] md:right-[-20px] lg:bottom-[-24px] lg:right-[-24px] w-8 h-8 md:w-15 md:h-15 lg:w-20 lg:h-20 flex items-center justify-center">
                    <Image
                      src={KiwiBird}
                      alt="Kiwi decoration"
                      className="w-full h-full object-contain animate-float"
                    />
                  </div>
                )}
              </div>

              <div className="text-white max-w-xl flex flex-col md:min-h-[300px]">
                <h2 className={`text-2xl md:text-3xl font-semibold mb-2 ${kosugiMaru.className}`}>
                  {event.title}
                </h2>
                <h3 className="text-base md:text-lg font-medium mb-4">
                  HOSTED BY: {event.hostedBy}
                </h3>
                <div className="md:flex-grow">
                  <TruncatedDescription description={event.description} maxLength={275} />
                </div>
                <button
                  onClick={() => {
                    setEventToSignUp({ title: event.title, id: event.id })
                    setSignOpen(true)
                  }}
                  className="mt-6 mb-4 px-6 py-2 bg-white text-[#13384E] font-semibold rounded-xl shadow hover:bg-gray-200 transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:animate-glow self-start md:mt-auto"
                >
                  SIGN UP HERE
                </button>
              </div>
            </AnimatedSection>
          ))}
        </section>
      </AnimatedSection>

      <SignUpModal
        signOpen={signOpen}
        setSignOpen={setSignOpen}
        eventOptions={eventNames}
        eventToSignUp={eventToSignUp}
      />

      <Modal
        open={galleryOpen}
        onClose={closeGallery}
        noHeader
        className="w-full max-w-3xl !bg-[#FFF8F3] p-6 rounded-3xl shadow-2xl"
        superClassName="bg-black/60"
      >
        <Modal.Body className="p-0">
          <div className="relative">
            <button
              type="button"
              onClick={closeGallery}
              className="absolute text-[#13384E] transition hover:text-[#0b2433]"
              style={{ top: '-0.75rem', right: '-0.75rem' }}
              aria-label="Close gallery"
            >
              <IconX size={28} />
            </button>

            {activeEvent && (
              <h3 className="mb-6 text-center text-2xl font-semibold text-[#13384E]">
                {activeEvent.title}
              </h3>
            )}

            <div className="relative">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl bg-black/5">
                {activeGallery.length > 0 && (
                  <Image
                    src={activeGallery[activeIndex] || ''}
                    alt={activeEvent?.title ?? 'Event image'}
                    fill
                    sizes="(max-width: 768px) 90vw, 640px"
                    className="object-cover transition-all duration-500 ease-in-out"
                    key={activeIndex}
                  />
                )}
              </div>

              {activeGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#13384E] shadow transition hover:bg-white"
                    aria-label="Previous image"
                  >
                    <IconChevronLeft size={28} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#13384E] shadow transition hover:bg-white"
                    aria-label="Next image"
                  >
                    <IconChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {activeGallery.length > 1 && (
              <div className="mt-6 flex justify-center gap-1 md:gap-1.5">
                {activeGallery.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="inline-flex h-7 w-7 items-center justify-center p-0"
                    aria-label={`Go to image ${index + 1}`}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <span
                      className="block rounded-full transition"
                      style={{
                        width: index === activeIndex ? '0.7rem' : '0.5rem',
                        height: index === activeIndex ? '0.7rem' : '0.5rem',
                        backgroundColor:
                          index === activeIndex ? '#13384E' : 'rgba(19, 56, 78, 0.35)',
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
