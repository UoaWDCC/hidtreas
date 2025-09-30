import EventsCard from './EventsCard'
import PastEventsPopUpModal from './PastEventsPopUpModal'
import { useState } from 'react'

type EventType = {
  id: string
  name: string
  hosted_by: string
  description: string
  date_range: {
    start: string
    end: string
  }
  image?: string
}

export default function PastEvents({ events }: { events: EventType[] }) {
  const [signOpen, setSignOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <>
      <div className="md:flex max-w-7xl mx-auto space-y-[2vh] md:space-x-[4vw] md:space-y-0 px-1 pt-4 pb-[2vw] justify-between items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-fit">
          {events.map((event, idx) => (
            <div key={event.id}>
              <EventsCard
                event={event}
                onOpenModal={() => {
                  setSelectedIdx(idx)
                  setSignOpen(true)
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <PastEventsPopUpModal
        signOpen={signOpen}
        setSignOpen={setSignOpen}
        events={events}
        initialIdx={selectedIdx}
      />
    </>
  )
}
