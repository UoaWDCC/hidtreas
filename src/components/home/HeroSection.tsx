'use client'
import Image from 'next/image'
import elderlyImage from '@/assets/elderly.jpg'
import logoImage from '@/assets/sharpened_logo.png'
import { useState } from 'react'
import SignUpModal from '../common/SignUpModal'

export default function HeroSection() {
  const [signOpen, setSignOpen] = useState(false)

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-24 py-1">
      <div className="relative rounded-b-3xl md:rounded-b-[5.5rem] overflow-hidden w-full min-h-[34.375rem] md:min-h-[21.875rem] aspect-auto md:aspect-[16/7.5]">
        <Image
          src={elderlyImage}
          alt="Elderly"
          fill
          className="object-cover object-center rounded-b-3xl md:rounded-b-[5.5rem]"
          priority
        />
        <div className="absolute inset-0 bg-white/50 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center md:items-start md:justify-start md:pl-32 md:pt-[8.75rem] px-4">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8 w-full max-w-xs sm:max-w-sm md:max-w-none">
            {/* Logo */}
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <Image
                src={logoImage}
                alt="Logo"
                width={400}
                height={400}
                className="w-[9rem] sm:w-[10rem] md:w-[16rem] lg:w-[25rem] h-auto"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-[1.875rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[5.2rem] font-extrabold leading-tight tracking-wide mt-[0.125rem]">
                HIDDEN
                <br />
                TREASURE
              </h1>
              <p className="mt-4 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.6rem] font-normal">
                Preserving the past, inspiring the future.
              </p>
              <button
                className="mt-6 bg-[#13384E] text-white px-[2rem] py-[0.75rem] rounded-md text-[1.125rem] font-semibold hover:bg-[#0a2638] transition"
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
