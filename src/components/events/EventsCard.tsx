import Image from 'next/image'
import KiwiBird from '@/assets/kiwiBird.svg'
import PlaceholderImg from '@/assets/event-pic.png'

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

export default function EventsCard({
  event,
  onOpenModal,
}: {
  event: EventType
  onOpenModal: () => void
}) {
  return (
    <div className="flex flex-col justify-center items-center w-70 h-90 border-4 border-[#13384E] rounded-xl gap-y-2 px-4 bg-[#FFF8F3]">
      <div className="relative flex justify-center items-center">
        <h3 className="text-2xl">{event.name}</h3>
        <Image src={KiwiBird} alt="kiwi-bird" width={40} className="absolute top-0 left-35" />
      </div>

      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="relative flex justify-center items-center">
          <Image src={event.image || PlaceholderImg} alt={event.name} width={210} height={140} />
          <p className="absolute text-xs rotate-270 right-40 whitespace-nowrap">
            HOSTED BY: {event.hosted_by}
          </p>
        </div>
        <p className="text-xs">{event.description}</p>
        <button
          onClick={onOpenModal}
          className="font-bold border-2 rounded-md gap px-2 cursor-pointer"
        >
          READ EVENT RECAP HERE
        </button>
      </div>
    </div>
  )
}
