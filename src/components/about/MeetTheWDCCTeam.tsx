'use client'

import Image from 'next/image'

import aboutUsLeaf from '@/assets/about_us_leaf.png'
import hidtreasWdccTeam from '@/assets/hidtreas-wdcc-team.jpg'
import blueKoru from '@/assets/blue_koru.png'

export default function MeetTheWDCCTeam() {
  return (
    <section className="relative">
      <Image
        src={blueKoru}
        alt="Koru"
        className="absolute right-0 top-[10%] sm:bottom-[1/3] w-20 sm:w-35 rotate-270 z-[-10]"
        quality={80}
      />

      <div className="px-[1rem] sm:px-[1.5rem] md:px-[2rem] lg:px-[6vw] py-4 md:py-8 mb-[4rem] md:mb-[6rem]">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem] items-center">
            {/* Left side - Background image with decoration */}
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh]">
                <Image
                  src={hidtreasWdccTeam}
                  alt="Hidtreas WDCC Team"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
              </div>

              {/* Leaf decoration */}
              <div className="absolute -bottom-16 -left-[6rem] sm:-left-[8rem] md:-left-[10rem] z-10">
                <Image
                  src={aboutUsLeaf}
                  alt="Leaf decoration"
                  width={160}
                  height={200}
                  className="w-[6rem] sm:w-[8rem] md:w-[10rem] h-auto"
                  quality={80}
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 space-y-4 md:space-y-6">
              <h2 className={`text-[clamp(1.8rem,5vw,3rem)] text-center font-bold`}>
                {' '}
                {/*   ${kosugiMaru.className}  text-center text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-black leading-tight*/}
                Meet the WDCC Team!
              </h2>

              <div className="space-y-3 md:space-y-4">
                <p
                  className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] leading-relaxed font-normal text-center mx-auto max-w-[70ch]"
                  style={{ color: '#13384E' }}
                >
                  The Web Development and Consulting Club (WDCC) helped design and create this very
                  website! Here are the members who brought it to life: <br />
                  Top row: Nathan Dalpatan, Andrew Chen, Jack Harken <br />
                  Second Row: Daniel Kim, Ruby McNamee, Daniel Kim <br />
                  Bottom Row: Toshiro Mendoza, Chris Kang, Atul Kodla, Bryanna Yeo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
