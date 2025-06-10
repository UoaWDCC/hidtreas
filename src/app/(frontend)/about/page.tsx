import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Image from 'next/image'

import { La_Belle_Aurore, Kosugi_Maru } from 'next/font/google'

const laBelleAurore = La_Belle_Aurore({
  subsets: ['latin'],
  weight: '400',
})

const kosugiMaru = Kosugi_Maru({
  subsets: ['latin'],
  weight: '400',
})

// Import assets
import blueWave from '@/assets/blue_wave.png'
import bigFeather from '@/assets/big_feather.png'
import blueKoru from '@/assets/blue_koru.png'
import aboutUsLeaf from '@/assets/about_us_leaf.png'
import quotesBackground from '@/assets/quotesbackground.png'
import meetTheTeamBackground from '@/assets/meettheteambackground.png'

export default async function AboutPage() {
  return (
    <>
      <Header />

      {/* Quotes Section */}
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
                "A doloribus at rerum culpa est eligendi veniam. Aut quia ea assumenda cum pa
                nostrum vel"
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

      {/* Meet the WDCC Team Section */}
      <section className="px-[1rem] sm:px-[1.5rem] md:px-[2rem] lg:px-[6vw] py-8 md:py-16">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem] items-center">
            {/* Left side - Background image with decoration */}
            <div className="relative order-2 lg:order-1">
              <div className="relativeoverflow-hidden w-full h-[50vh]">
                <Image
                  src={meetTheTeamBackground}
                  alt="Meet the team background"
                  fill
                  className="object-contain object-center"
                />
              </div>

              {/* Leaf decoration*/}
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
              <h2
                className={`${kosugiMaru.className} text-center text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-black leading-tight`}
              >
                Meet the WDCC Team!
              </h2>

              <div className="space-y-3 md:space-y-4">
                <p
                  className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] leading-relaxed font-normal text-center mx-auto max-w-[70ch]"
                  style={{ color: '#13384E' }}
                >
                  Donec mauris ligula lorem ante mauris bibendum magna mauris tincidunt tortor
                  mauris bibendum magna mauris tincidunt lorem ante mauris bibendum magna mauris
                  lorem mauris lorem mauris bibendum magna mauris tincidunt lorem ante mauris
                  bibendum magna mauris ligula lorem ante mauris bibendum magna mauris tincidunt
                  mauris bibendum magna mauris lorem mauris lorem mauris bibendum magna.
                </p>
              </div>
            </div>
          </div>

          {/* Blue Koru decoration */}
          <div className="absolute top-1/3 right-0 z-10 -translate-y-1/2 translate-x-[60%] scale-x-[-1] scale-y-[-1] rotate-45 origin-top">
            <Image
              src={blueKoru}
              alt="Blue koru decoration"
              width={150}
              height={150}
              className="w-[6rem] sm:w-[7.5rem] md:w-[9rem] h-auto"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
