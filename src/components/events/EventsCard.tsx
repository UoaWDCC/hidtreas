import Image from 'next/image'
import EventPic from '@/assets/event-pic.png'
import KiwiBird from '@/assets/kiwiBird.svg'
export default function EventsCard() {
  return (
    <div className="flex flex-col justify-center items-center w-70 h-90 border-4 border-[#13384E] rounded-xl gap-y-2 px-4 bg-[#FFF8F3]">
      <div className="relative flex justify-center items-center">
        <h3 className="text-2xl">Super duper Interesting Event</h3>
        <Image src={KiwiBird} alt="kiwi-bird" width={40} className="absolute top-0 left-35" />
      </div>

      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="relative flex justify-center items-center">
          <Image src={EventPic} alt="event-picture" width={210} />
          <p className="absolute text-xs rotate-270 right-40 whitespace-nowrap">
            HOSTED BY: a person
          </p>
        </div>
        <p className="text-xs">Aut quia assumenda eum nostrum velit the est quidem fac. </p>
        <button className="font-bold border-2 rounded-md gap px-2 cursor-pointer">
          READ EVENT RECAP HERE
        </button>
      </div>
    </div>
  )
}
