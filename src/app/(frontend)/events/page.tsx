
'use client'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Hero from '@/components/events/Hero'
import EventsSignUpModal from '@/components/events/EventsSignUpModal'
import { useState } from 'react'

export default function EventsPage() {
  const [signOpen, setSignOpen] = useState(false)

  return (
    <div className="home">
      <Header />
      <Hero />
      <div className="flex justify-center mt-10 mb-10 ">
        <button
          className="bg-[#13384E] text-white hover:cursor-pointer w-[15rem] h-[5rem]"
          onClick={() => setSignOpen(true)}
        >
          Temporary, Click Here
        </button>
      </div>
      <Footer />
      <EventsSignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
    </div>
  )
}
