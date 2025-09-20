'use client'
import Image from 'next/image'
import { Covered_By_Your_Grace } from 'next/font/google'

import blueWave from '@/assets/blue_wave.png'
import bigFeather from '@/assets/big_feather.png'
import quotesBackgroundImage from '@/assets/hennaDrawing_upscaled.png'

const coveredByYourGrace = Covered_By_Your_Grace({
  subsets: ['latin'],
  weight: '400',
})

export default function QuotesSection() {
  return (
    <section className="py-8  md:py-12">
      <div className="relative w-full min-h-[70vh] mb-[3rem]">
        <Image
          src={quotesBackgroundImage}
          alt="Henna Being Drawn"
          fill
          className="object-cover object-center opacity"
        />

        {/* Blue wave decoration - top */}
        <div className="absolute -top-[10vh] right-[20%] z-20">
          <Image
            src={blueWave}
            alt="Blue wave decoration"
            width={110}
            height={80}
            className="w-[7.5rem] sm:w-[8rem] md:w-[9rem] h-auto"
          />
        </div>

        {/* Quote Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-[1rem] sm:px-[1.5rem] md:px-[2rem]">
          <div className="max-w-[60rem] w-[90%] text-center">
            <blockquote
              className={`${coveredByYourGrace.className} text-white text-[2rem] sm:text-[3rem] md:text-[3.5rem]`}
            >
              {/*make the text stand out a bit more from background*/}
              "Let the wisdom of the past guide the hope of the future—every person is a hidden
              treasure waiting to shine."
            </blockquote>
          </div>
        </div>

        {/* Big feather decoration - bottom left */}
        <div className="absolute top-full left-[2.5rem] md:left-[3.5rem] lg:left-[5rem] -translate-y-1/2 z-20">
          <Image
            src={bigFeather}
            alt="Feather decoration"
            width={150}
            height={190}
            className="w-[6rem] sm:w-[7rem] md:w-[8rem] lg:w-[9rem] h-auto -scale-x-100 -rotate-20 opacity-100"
          />
        </div>
      </div>
    </section>
  )
}
