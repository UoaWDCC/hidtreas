'use client'
import Image from 'next/image'
import whatWeDoImage from '@/assets/hidtreas-what-we-do.jpg'
import kiwiBird from '@/assets/kiwiBird.svg'
import leaf from '@/assets/leaf.svg'
import { useState } from 'react'
import SignUpModal from '../common/SignUpModal'

export default function WhatWeDo() {
  const [signOpen, setSignOpen] = useState(false)
  return (
    <div className={'bg-[#D9D9D9]'}>
      <div className="p-20 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto gap-x-16">
        <div className="md:w-1/2 text-center md:text-left">
          <div className="relative w-fit mx-auto mb-6">
            <Image
              src={kiwiBird}
              alt="Kiwi Bird"
              className="absolute w-12 md:w-16 -top-6 left-0.5 -translate-y-1 md:-top-12 md:left-0 md:translate-y-0"
            />
            <h2 className="text-6xl font-bold">WHAT WE DO</h2>
          </div>

          <p className="mb-6 text-lg">
            We provide support for older people, empower women through fitness and personal support,
            and run donation drives for clothing, toys, and food.
          </p>
          <p className="mb-6 text-lg">
            We also promote cultural participation, sustainability education, and community
            workshops that reflect our commitment to long-term well-being.
          </p>

          <button
            className="border-2 border-[#13384E] text-[#13384E] font-semibold px-8 py-3 rounded-md hover:bg-[#13384E] hover:text-white hover:cursor-pointer transition text-lg"
            onClick={() => setSignOpen(true)}
          >
            SIGN UP
          </button>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          <Image src={whatWeDoImage} alt="What We Do" className="w-full rounded-lg shadow-xl" />
          <Image src={leaf} alt="Leaf" className="absolute w-40 md:w-48 -bottom-8 -left-20" />
        </div>
      </div>
      <SignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
    </div>
  )
}
