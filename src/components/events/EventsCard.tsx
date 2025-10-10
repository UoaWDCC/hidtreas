import Image from 'next/image'
import KiwiBird from '@/assets/kiwiBird.svg'
import PlaceholderImg from '@/assets/event-pic.png'
import type { EventType } from '@/types/event'

export default function EventsCard({
  event,
  onOpenModal,
}: {
  event: EventType
  onOpenModal: () => void
}) {
  return (
    <div className="flex flex-col items-center w-70 h-90 border-4 border-[#13384E] rounded-xl gap-y-3 px-4 pt-6 pb-6 bg-[#FFF8F3]">
      <div className="flex flex-col items-center gap-1">
        <Image src={KiwiBird} alt="kiwi-bird" width={36} />
        <h3 className="text-2xl text-center">{event.title}</h3>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="relative flex justify-center items-center">
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={210}
            height={140}
            className="w-[210px] h-[140px] object-cover rounded-lg"
          />
          <p className="absolute text-xs rotate-270 right-40 whitespace-nowrap">
            HOSTED BY: {event.hostedBy}
          </p>
        </div>
        <p className="text-xs text-center">{event.description}</p>
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
