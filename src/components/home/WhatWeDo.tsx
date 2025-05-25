'use client'
import Image from 'next/image'
import rockCarving from '@/assets/rockCarving.png'
import kiwiBird from '@/assets/kiwiBird.svg'
import leaf from '@/assets/leaf.svg'
import { useState } from 'react'
import SignUpModal from '../common/SignUpModal'

export default function WhatWeDo() {
  const [signOpen, setSignOpen] = useState(false)
  return (
    <div className={'bg-[#D9D9D9]'}>
      <div className="p-16 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-x-12">
        <div className="md:w-1/2 text-center md:text-left">
          <div className="relative w-fit mx-auto mb-4">
            <Image
              src={kiwiBird}
              alt="Kiwi Bird"
              className="absolute w-10 md:w-14 -top-5 left-0.5 -translate-y-1 md:-top-10 md:left-0 md:translate-y-0"
            />
            <h2 className="text-5xl font-bold">WHAT WE DO</h2>
          </div>

          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
            quisque faucibLorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur
            adipiscing elit quisque faucibus ex sem.
          </p>
          <p className="mb-4">
            Ex sapien vitae pellentesque seLorem ipsum dolor sit amet consectetur adipiscing elit.
            Consectetur adipiscing elit quisque faucibus ex sapien vitae. us ex sem.
          </p>

          <button
            className="border-2 border-[#13384E] text-[#13384E] font-semibold px-6 py-2 rounded-md hover:bg-[#13384E] hover:text-white hover:cursor-pointer transition"
            onClick={() => setSignOpen(true)}
          >
            SIGN UP
          </button>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 relative">
          <Image src={rockCarving} alt="Rock Carving" className="w-full rounded-md shadow-lg" />
          <Image src={leaf} alt="Leaf" className="absolute w-32 md:w-40 -bottom-6 -left-15" />
        </div>
      </div>
      <SignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
    </div>
  )
}
