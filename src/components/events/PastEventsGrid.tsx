import EventsCard from './EventsCard'

export default function PastEvents() {
  return (
    <div className="md:flex max-w-7xl mx-auto space-y-[2vh] md:space-x-[4vw] md:space-y-0 px-1 pt-4 pb-[2vw] justify-between items-center">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-fit">
      <EventsCard />
      <EventsCard />
      <EventsCard />
      <EventsCard />
      <EventsCard />
      <EventsCard />
    </div>
    </div>
  )
}
