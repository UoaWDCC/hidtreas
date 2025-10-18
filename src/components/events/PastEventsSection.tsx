'use client'

import YearFilter from '@/components/events/YearFilter'
import PastEvents from '@/components/events/PastEventsGrid'
import Image from 'next/image'
import BlueKoru from '@/assets/blue_koru.png'
import type { EventType } from '@/types/event'
import { useMemo, useState } from 'react'
import { getEventYear } from '@/lib/getEventYear'

export default function PastEventsSection({ initialEvents }: { initialEvents: EventType[] }) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const years = useMemo(() => {
    const set = new Set<number>()
    initialEvents.forEach((e) => {
      const y = getEventYear(e.date)
      if (y) set.add(y)
    })
    return Array.from(set).sort((a, b) => b - a)
  }, [initialEvents])

  const filtered = useMemo(() => {
    if (!selectedYear) return initialEvents
    return initialEvents.filter((e) => getEventYear(e.date) === selectedYear)
  }, [initialEvents, selectedYear])

  return (
    <div className="relative py-50 overflow-x-clip">
      <Image
        src={BlueKoru}
        alt="Blue Koru decoration"
        className="absolute right-0 top-[17vh] md:top-[10vh] lg:top-[7vh] rotate-180 w-[20vw] md:w-[18vw] lg:w-[17vw]"
      />
      <h3 className="bg-[#E6E1DE] inline text-l sm:text-xl md:text-3xl lg:text-5xl px-20 py-5 border-none rounded-t-xl font-bold">
        PREVIOUS EVENTS
      </h3>
      <div className="bg-[#E6E1DE] flex flex-col items-center gap-y-10 py-10">
        <YearFilter years={years} selectedYear={selectedYear} onSelectYear={setSelectedYear} />
        <PastEvents events={filtered} />
      </div>
    </div>
  )
}
