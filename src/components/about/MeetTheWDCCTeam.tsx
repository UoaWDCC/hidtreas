'use client'

import Image from 'next/image'

import aboutUsLeaf from '@/assets/about_us_leaf.png'
import meetTheTeamBackground from '@/assets/meettheteambackground.png'
import blueKoru from '@/assets/blue_koru.png'

export default function MeetTheWDCCTeam() {
  return (
    <section className="relative md:py-12">
      <Image
        src={blueKoru}
        alt="Koru"
        className="absolute right-0 sm:bottom-[1/3] w-35 rotate-270 z-[-10]"
      />

      <div className="px-[1rem] sm:px-[1.5rem] md:px-[2rem] lg:px-[6vw] py-8 md:py-16 mb-[10rem]">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem] items-center">
            {/* Left side - Background image with decoration */}
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden w-full h-[50vh]">
                <Image
                  src={meetTheTeamBackground}
                  alt="Meet the team background"
                  fill
                  className="object-contain object-center"
                />
              </div>

              {/* Leaf decoration */}
              <div className="absolute bottom-12 left-[2rem] z-10 translate-y-1/2">
                <Image
                  src={aboutUsLeaf}
                  alt="Leaf decoration"
                  width={160}
                  height={200}
                  className="w-[6rem] sm:w-[8rem] md:w-[10rem] h-auto"
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
                  website! From left to right, here are the members who brought it to life: insert
                  members’ names or roles here :)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
