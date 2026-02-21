import Image from 'next/image'
import runImage from '@/assets/community-run.png'
import blueKoru from '@/assets/blue-koru.png'
import AnimatedSection from '@/components/common/AnimatedSection'

export default function Hero() {
  return (
    <div className="relative pt-32 pb-16">
      {/* Hero */}
      <AnimatedSection animationClass="animate-slide-in-bottom" delay={0.1}>
        <div className="relative flex justify-center">
          <div className="w-full relative flex justify-center">
            <Image
              src={runImage}
              alt="Events page main image"
              className="w-[80vw] md:h-[45vh] lg:h-[75vh] rounded-4xl object-cover"
            />

            {/* Decorative elements */}
            <Image
              src={blueKoru}
              alt="Blue Koru decoration"
              className="absolute top-[-20%] right-[0] w-[20vw] -rotate-180"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animationClass="animate-slide-in-bottom" delay={0.2}>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1 className="text-[1.875rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[5.2rem] font-extrabold leading-tight tracking-wide mt-6 animate-breathe">
              EVENTS
            </h1>
            {/* Descriptive text */}
          </div>

          <div className="flex justify-end w-[89vw]">
            <div className="w-full flex justify-end text-right ">
              <div className="w-[50vw]">
                <p className="mt-4 text-[0.75rem rem] sm:text-[0.875remrem] md:text-[1rem] lg:text-[1.125rem] font-normal animate-fade-in">
                  Hidden Treasure hosts events that build community and connect generations. It
                  supports seniors, runs women&apos;s groups and donation drives, promotes culture
                  through libraries and radio, and partners with schools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
