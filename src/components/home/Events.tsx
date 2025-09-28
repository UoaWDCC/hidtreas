'use client'
import Image from 'next/image'
import backgroundImage from '@/assets/blue_wave.png'
import feather from '@/assets/big_feather.png'
import { useState } from 'react'
import EventsCarousel from './EventsCarousel'
import AnimatedSection from '../common/AnimatedSection'

export default function Events() {
  return (
    <section className="px-4 sm:px-[3vw] py-4 sm:py-[1vw] lg:pt-20">
      <div className="relative w-full max-w-[1200px] mx-auto h-auto min-h-[70vh] px-4">
        <div className="relative w-full h-[100vh] flex items-center justify-center">
          <Image
            src={backgroundImage}
            alt="Background Image"
            className="w-[90vw] min-w-[500px] h-auto max-w-none"
            priority
            style={{
              animation: 'bob 3s ease-in-out infinite 0.3s',
            }}
          />
        </div>
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center md:items-start md:justify-start md:pl-[2vw] md:pt-[6vw] px-4 sm:px-[3vw]">
          <div className="flex flex-col items-center md:items-start md:gap-[2vw] w-full max-w-xs sm:max-w-none md:max-w-none">
            <div className="flex flex-row items-center gap-4 animate-slide-in-left pb-10 leading-tight tracking-wide animate-bob">
              {/* Logo */}
              <Image
                src={feather}
                alt="Feather Icon"
                className="w-[12vw] max-w-[80px] h-auto scale-x-[-1]"
              />
              {/* Text */}
              <h2
                className="text-3xl sm:text-[6vw] md:text-[4vw] font-bold "
                style={{
                  animation: 'bob 3s ease-in-out infinite 0.3s',
                }}
              >
                UPCOMING
                <br />
                EVENTS
              </h2>
            </div>
            <EventsCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
