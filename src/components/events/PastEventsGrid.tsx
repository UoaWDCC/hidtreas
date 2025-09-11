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
      <div className="grid grid-cols-3 gap-10 w-fit">
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
      <PastEventsPopUpModal
        signOpen={signOpen}
        setSignOpen={setSignOpen}
        events={events}
        initialIdx={selectedIdx}
      />
    </>
  )
}
