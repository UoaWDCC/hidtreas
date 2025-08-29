import YearFilter from '@/components/events/YearFilter'
import PastEvents from '@/components/events/PastEventsGrid'
import Image from 'next/image'
import BlueKoru from '@/assets/blue_koru.png'

export default function PastEventsSection() {
  return (
    <div className="w-full max-w-full relative py-50">
      <Image
        src={BlueKoru}
        alt="Blue Koru decoration"
        className="absolute right-0 top-[17vh] md:top-[10vh] lg:top-[7vh] rotate-180 w-[20vw] md:w-[18vw] lg:w-[17vw]"
      />
      <h3 className="bg-[#E6E1DE] inline text-l sm:text-xl md:text-3xl lg:text-5xl px-20 py-5 border-none rounded-t-xl font-bold">
        PREVIOUS EVENTS
      </h3>
      <div className="bg-[#E6E1DE] flex flex-col items-center gap-y-10 py-10">
        <YearFilter />
        <PastEvents />
      </div>
    </div>
  )
}
