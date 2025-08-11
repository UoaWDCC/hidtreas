'use client'
import Image from 'next/image'
import heroImage from '@/assets/hidtreas-homepage-hero-img.jpg'
import logoImage from '@/assets/sharpened_logo.png'
import { useState } from 'react'
import SignUpModal from '../common/SignUpModal'
import AnimatedSection from '../common/AnimatedSection'

export default function HeroSection() {
  const [signOpen, setSignOpen] = useState(false)

  return (
    <section className="px-4 sm:px-[3vw] py-4 sm:py-[1vw]">
      <div className="relative rounded-b-[4vw] overflow-hidden w-full sm:w-[95%] mx-auto h-[70vh] sm:h-[40vw]">
        <Image
          src={heroImage}
          alt="Hidden Treasure Hero"
          fill
          className="object-cover object-center rounded-b-[4vw]"
          priority
        />
        <div className="absolute inset-0 bg-white/70 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center md:items-start md:justify-start md:pl-[12vw] md:pt-[11vw] px-4 sm:px-[3vw]">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-[2vw] w-full max-w-xs sm:max-w-sm md:max-w-none">
            {/* Logo */}
            <AnimatedSection animationClass="animate-slide-in-left">
              <div className="flex-shrink-0 mb-4 sm:mb-[2vw] md:mb-0 animate-bob">
                <Image src={logoImage} alt="Logo" className="w-32 sm:w-[32vw] md:w-[24vw] h-auto" />
              </div>
            </AnimatedSection>

            {/* Text Content */}
            <AnimatedSection animationClass="animate-slide-in-right" delay={0.2}>
              <div className="flex-1 text-center md:text-left">
                <h1
                  className="text-4xl sm:text-[6vw] md:text-[5vw] font-extrabold leading-tight tracking-wide text-glow animate-bob"
                  style={{
                    animation: 'bob 3s ease-in-out infinite 0.3s',
                  }}
                >
                  HIDDEN
                  <br />
                  TREASURE
                </h1>
                <p
                  className="mt-2 sm:mt-[1.5vw] text-base sm:text-[2vw] md:text-[1.5vw] font-normal text-glow animate-bob"
                  style={{
                    animation: 'bob 3s ease-in-out infinite 0.6s',
                  }}
                >
                  Preserving the past, inspiring the future.
                </p>
                <button
                  className="mt-4 sm:mt-[2vw] bg-[#13384E] text-white px-6 sm:px-[2.5vw] py-3 sm:py-[1vw] rounded-lg sm:rounded-[1vw] text-lg sm:text-[1.6vw] md:text-[1.1vw] font-semibold hover:bg-[#0a2638] hover:cursor-pointer transition animate-bob hover-lift"
                  style={{
                    animation: 'bob 3s ease-in-out infinite 0.9s',
                  }}
                  onClick={() => setSignOpen(true)}
                >
                  JOIN US
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <SignUpModal setSignOpen={setSignOpen} signOpen={signOpen} />
    </section>
  )
}
