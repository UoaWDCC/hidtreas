'use client'
import Image from 'next/image'
import backgroundImage from '@/assets/blue_wave.png'
import feather from '@/assets/big_feather.png'
import { useState } from 'react'
import EventsCarousel from './EventsCarousel'
import AnimatedSection from '../common/AnimatedSection'

export default function Events() {
  return (
    <section className="px-4 sm:px-[3vw] py-4 sm:py-[1vw] lg:pb-30 lg:pt-10">
      <div className="relative w-full sm:w-[95%] mx-auto h-full sm:h-[85vh] md:h-[40vw]">
        <div className="relative w-full h-[100vh] flex items-center justify-center">
          <Image
            src={backgroundImage}
            alt="Background Image"
            className="max-w-none w-[150vh] h-auto"
            priority
            style={{
              animation: 'bob 3s ease-in-out infinite 0.3s',
            }}
          />
        </div>
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center md:items-start md:justify-start md:pl-[2vw] md:pt-[6vw] px-4 sm:px-[3vw]">
          <div className="flex flex-col items-center md:flex-col md:items-start md:gap-[2vw] w-full max-w-xs sm:max-w-none md:max-w-none">
            <div className="flex flex-row items-center gap-4 animate-slide-in-left">
              {/* Logo */}
              <Image
                src={feather}
                alt="Feather Icon"
                className="w-[80px] h-auto scale-x-[-1] animate-bob"
              />
              {/* Text */}
              <h2
                className="text-3xl sm:text-[6vw] md:text-[4vw] font-bold leading-tight tracking-wide animate-bob"
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
