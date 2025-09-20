'use client'
import Image from 'next/image'
import heroImage from '@/assets/blue_wave.png'
import logoImage from '@/assets/big_feather.png'
import { useState } from 'react'
import EventsCarousel from './EventsCarousel'
import AnimatedSection from '../common/AnimatedSection'

export default function Events() {
  return (
    <section className=" px-4 sm:px-[3vw] py-4 sm:py-[1vw] lg:pb-10">
      <div className="relative w-full sm:w-[95%] mx-auto h-full sm:h-[85vh] md:h-[40vw]">
        <div className="relative w-full h-[100vh] flex items-center justify-center">
          <Image
            src={heroImage}
            alt="Hidden Treasure Hero"
            className="max-w-none w-[140vh] h-auto"
            priority
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center md:items-start md:justify-start md:pl-[12vw] md:pt-[11vw] px-4 sm:px-[3vw]">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-[2vw] w-full max-w-xs sm:max-w-none md:max-w-none">
            {/* Logo */}
            <div className="flex-shrink-0 mb-4 sm:mb-[2vw] md:mb-0 animate-bob animate-slide-in-left">
              <Image src={logoImage} alt="Logo" className="w-[50%] h-[50%]" />
            </div>

            {/* Text Content */}
            <div
              className="flex-1 text-center md:text-left animate-slide-in-right animate-stagger-1"
              style={{ opacity: 0, transform: 'translateX(100px)', visibility: 'hidden' }}
            >
              <h1
                className="text-4xl sm:text-[6vw] md:text-[5vw] font-extrabold leading-tight tracking-wide animate-bob"
                style={{
                  animation: 'bob 3s ease-in-out infinite 0.3s',
                }}
              >
                UPCOMING
                <br />
                EVENTS
              </h1>
              <EventsCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
