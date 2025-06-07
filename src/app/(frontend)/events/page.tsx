'use client'
import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import SignUpModal from '@/components/common/SignUpModal'

import Koru from '@/assets/recent_events_koru.png'
import PlaceholderImg from '@/assets/placeholder_img.png'

import { Kosugi_Maru } from 'next/font/google'

const kosugiMaru = Kosugi_Maru({
  subsets: ['latin'],
  weight: '400',
})

export default function EventsPage() {
  const [signOpen, setSignOpen] = useState(false)

  return (
    <>
      <Header />

      {/* Koru decoration */}
      <div className="pt-15 relative overflow-visible">
        <Image
          src={Koru}
          alt="Koru decoration"
          className="absolute -left-10 -top-12 w-[15%] max-w-[160px] h-auto pointer-events-none rotate-[20deg]"
        />
      </div>

      {/* Recent Events header bar */}
      <div
        className="w-1/3 bg-[#13384E] rounded-t-2xl flex items-center justify-center"
        style={{ height: '5rem' }}
      >
        <h1 className="text-white text-base md:text-2xl lg:text-3xl font-semibold">
          RECENT EVENTS
        </h1>
      </div>

      {/* Main Recent Events section */}
      <section
        className="relative w-full bg-[#13384E] px-6 pt-64 pb-12 overflow-x-hidden"
        style={{ minHeight: '45rem' }}
      ></section>

      <SignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
      <Footer />
    </>
  )
}
