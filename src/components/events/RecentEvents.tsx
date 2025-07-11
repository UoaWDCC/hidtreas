'use client'
import { useState } from 'react'
import Image from 'next/image'
import SignUpModal from '@/components/common/SignUpModal'

import Koru from '@/assets/recent_events_koru.png'
import PlaceholderImg from '@/assets/placeholder_img.png'
import KiwiBird from '@/assets/kiwiBird.svg'

import { Kosugi_Maru } from 'next/font/google'
const kosugiMaru = Kosugi_Maru({ subsets: ['latin'], weight: '400' })

export default function RecentEvents() {
  const [signOpen, setSignOpen] = useState(false)

  return (
    <>
      {/* Koru decoration */}
      <div className="pt-15 relative overflow-visible hidden md:block">
        <Image
          src={Koru}
          alt="Koru decoration"
          className="absolute -left-10 -top-12 w-[15%] max-w-[160px] h-auto pointer-events-none rotate-[20deg]"
        />
      </div>

      {/* Header Bar */}
      <div
        className="w-[45%] bg-[#13384E] rounded-t-2xl flex items-center justify-center"
        style={{ height: '5rem' }}
      >
        <h2 className="text-white text-base md:text-2xl lg:text-3xl font-semibold">
          RECENT EVENTS
        </h2>
      </div>

      {/* Main Content */}
      <section
        className="relative w-full bg-[#13384E] px-6 pt-0 pb-12 overflow-x-hidden"
        style={{ minHeight: '80rem' }}
      >
        {/* Event Card x2 */}
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-start pt-10 pl-4 sm:pl-8 md:pl-12 lg:pl-20 gap-6 md:gap-10 lg:gap-20 mb-10"
          >
            <div className="relative w-full max-w-[70%] md:max-w-[400px] h-auto">
              <Image
                src={PlaceholderImg}
                alt="Event placeholder"
                width={400}
                height={300}
                className="w-full h-auto"
              />
              <div className="absolute top-0 left-0 bg-[#13384E] text-white px-5 py-3 text-lg font-semibold rounded-br-xl">
                12 June 2025
              </div>

              {/* Decoration: red circle (first) or kiwi (second) */}
              {idx === 0 ? (
                <div className="absolute rounded-full bg-[#eb5454] w-8 h-8 bottom-[-16px] left-[-16px] md:w-15 md:h-15 md:bottom-[-20px] md:left-[-20px] lg:w-20 lg:h-20 lg:bottom-[-24px] lg:left-[-24px]" />
              ) : (
                <div className="absolute bottom-[-16px] right-[-16px] md:bottom-[-20px] md:right-[-20px] lg:bottom-[-24px] lg:right-[-24px] w-8 h-8 md:w-15 md:h-15 lg:w-20 lg:h-20 flex items-center justify-center">
                  <Image
                    src={KiwiBird}
                    alt="Kiwi decoration"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="text-white max-w-xl">
              <h2 className={`text-2xl md:text-3xl font-semibold mb-2 ${kosugiMaru.className}`}>
                Super Duper Interesting Event
              </h2>
              <h3 className="text-base md:text-lg font-medium mb-4">HOSTED BY: Insert Name Here</h3>
              <p className={`text-sm md:text-base leading-relaxed ${kosugiMaru.className}`}>
                Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut
                rerum culpa est eligendi veniam. Qui blanditiis inventore ut sint beatae.
              </p>
              <p className={`text-sm md:text-base leading-relaxed ${kosugiMaru.className}`}>
                Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut
                rerum culpa est eligendi veniam. Qui blanditiis inventore ut sint beatae.
              </p>

              <button
                onClick={() => setSignOpen(true)}
                className="mt-10 px-6 py-2 bg-white text-[#13384E] font-semibold rounded-xl shadow hover:bg-gray-200 transition hover:cursor-pointer"
              >
                SIGN UP HERE
              </button>
            </div>
          </div>
        ))}
      </section>

      <SignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
    </>
  )
}
