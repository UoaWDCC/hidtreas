'use client'
import Image from 'next/image'
import heroImage from '@/assets/hidtreas-homepage-hero-img.jpg'
import logoImage from '@/assets/sharpened_logo.png'
import { useState } from 'react'
import SignUpModal from '../common/SignUpModal'

export default function HeroSection() {
  const [signOpen, setSignOpen] = useState(false)

  return (
    <section className="px-[3vw] py-[1vw]">
      <div className="relative rounded-b-[4vw] overflow-hidden w-[95%] mx-auto h-[40vw]">
        <Image
          src={heroImage}
          alt="Hidden Treasure Hero"
          fill
          className="object-cover object-center rounded-b-[4vw]"
          priority
        />
        <div className="absolute inset-0 bg-white/70 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center md:items-start md:justify-start md:pl-[12vw] md:pt-[11vw] px-[3vw]">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-[2vw] w-full max-w-xs sm:max-w-sm md:max-w-none">
            {/* Logo */}
            <div className="flex-shrink-0 mb-[2vw] md:mb-0">
              <Image src={logoImage} alt="Logo" className="w-[32vw] md:w-[24vw] h-auto" />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-[6vw] md:text-[5vw] font-extrabold leading-tight tracking-wide">
                HIDDEN
                <br />
                TREASURE
              </h1>
              <p className="mt-[1.5vw] text-[2vw] md:text-[1.5vw] font-normal">
                Preserving the past, inspiring the future.
              </p>
              <button
                className="mt-[2vw] bg-[#13384E] text-white px-[2.5vw] py-[1vw] rounded-[1vw] text-[1.6vw] md:text-[1.1vw] font-semibold hover:bg-[#0a2638] hover:cursor-pointer transition"
                onClick={() => setSignOpen(true)}
              >
                JOIN US
              </button>
            </div>
          </div>
        </div>
      </div>
      <SignUpModal setSignOpen={setSignOpen} signOpen={signOpen} />
    </section>
  )
}
