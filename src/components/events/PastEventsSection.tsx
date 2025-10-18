import YearFilter from '@/components/events/YearFilter'
import PastEvents from '@/components/events/PastEventsGrid'
import Image from 'next/image'
import BlueKoru from '@/assets/blue_koru.png'
import type { EventType } from '@/types/event'
import AnimatedSection from '@/components/common/AnimatedSection'

export default function PastEventsSection({ initialEvents }: { initialEvents: EventType[] }) {
  return (
    <div className="relative py-50 overflow-x-clip">
      <AnimatedSection animationClass="animate-slide-in-right" delay={0.2}>
        <Image
          src={BlueKoru}
          alt="Blue Koru decoration"
          className="absolute right-0 top-[17vh] md:top-[10vh] lg:top-[7vh] rotate-180 w-[20vw] md:w-[18vw] lg:w-[17vw]"
        />
      </AnimatedSection>

      {/* Past Events Section - Header and Content together */}
      <AnimatedSection animationClass="animate-slide-in-bottom" delay={0.4}>
        {/* Header Tab */}
        <h3 className="bg-[#E6E1DE] inline text-l sm:text-xl md:text-3xl lg:text-5xl px-20 py-5 border-none rounded-t-xl font-bold">
          PREVIOUS EVENTS
        </h3>

        {/* Main Content */}
        <div
          className="bg-[#E6E1DE] flex flex-col items-center gap-y-10 py-10"
          style={{ marginTop: '-1px' }}
        >
          <YearFilter />
          <PastEvents events={initialEvents} />
        </div>
      </AnimatedSection>
    </div>
  )
}
