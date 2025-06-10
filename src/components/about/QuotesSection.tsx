'use client'
import Image from 'next/image'
import { La_Belle_Aurore } from 'next/font/google'

import blueWave from '@/assets/blue_wave.png'
import bigFeather from '@/assets/big_feather.png'
import quotesBackground from '@/assets/quotesbackground.png'

const laBelleAurore = La_Belle_Aurore({
  subsets: ['latin'],
  weight: '400',
})

export default function QuotesSection() {
  return (
    <section className="py-8 md:py-16">
      <div className="relative w-full min-h-[70vh]">
        <Image
          src={quotesBackground}
          alt="Quotes background"
          fill
          className="object-cover object-center"
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
              className={`${laBelleAurore.className} text-[1.5rem] sm:text-[3rem] md:text-[4rem] text-black`}
            >
              "A doloribus at rerum culpa est eligendi veniam. Aut quia ea assumenda cum pa nostrum
              vel"
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
