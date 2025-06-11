import EventsCard from './EventsCard'

export default function PastEvents() {
  return (
    <div className="grid grid-cols-3 gap-10 w-fit">
      <EventsCard />
      <EventsCard />
      <EventsCard />
      <EventsCard />
      <EventsCard />
      <EventsCard />
    </div>
  )
}
