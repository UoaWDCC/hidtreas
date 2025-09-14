import YearFilter from '@/components/events/YearFilter'
import PastEventsFilter from '@/components/events/PastEventsFilter'
import PastEvents from '@/components/events/PastEventsGrid'
import Image from 'next/image'
import BlueKoru from '@/assets/blue_koru.png'

export default function PastEventsSection() {
  return (
    <div className="relative py-50">
      <Image
        src={BlueKoru}
        alt="Blue Koru decoration"
        width={256}
        className="absolute right-0 top-20 rotate-180 z-10"
      />
      <h3 className="bg-[#E6E1DE] inline text-5xl px-20 py-5 border-none rounded-t-xl font-bold">
        PREVIOUS EVENTS
      </h3>
      <PastEventsFilter />
      <div className="bg-[#E6E1DE] flex flex-col items-center gap-y-10 pt-2 pb-10"> 
        <YearFilter />
        <PastEvents />
      </div>
    </div>
  )
}
