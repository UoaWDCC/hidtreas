'use client'
import Image from 'next/image'
import whatWeDoImage from '@/assets/hidtreas-what-we-do_upscaled.png'
import kiwiBird from '@/assets/kiwiBird.svg'
import leaf from '@/assets/leaf.svg'
import { useState, useRef, useEffect } from 'react'
import SignUpModal from '../common/SignUpModal'

export default function WhatWeDo() {
  const [signOpen, setSignOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className={'bg-[#D9D9D9]'} ref={sectionRef}>
      <div className="px-6 py-12 sm:p-20 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto gap-8 md:gap-x-16">
        <div
          className={`w-full md:w-1/2 text-center md:text-left transition-all duration-1000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}
        >
          <div className="relative w-fit mx-auto mb-6">
            <Image
              src={kiwiBird}
              alt="Kiwi Bird"
              className={`absolute w-8 sm:w-12 md:w-16 -top-4 sm:-top-6 md:-top-12 left-0.5 -translate-y-1 sm:left-0.5 md:left-0 md:translate-y-0 transition-all duration-1000 ease-out ${
                isVisible ? 'animate-bounce' : ''
              }`}
              style={{
                animation: isVisible ? 'bob 3s ease-in-out infinite' : 'none',
              }}
            />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">WHAT WE DO</h2>
          </div>

          <p className="mb-4 sm:mb-6 text-base sm:text-lg">
            We provide support for older people, empower women through fitness and personal support,
            and run donation drives for clothing, toys, and food.
          </p>
          <p className="mb-6 text-base sm:text-lg">
            We also promote cultural participation, sustainability education, and community
            workshops that reflect our commitment to long-term well-being.
          </p>

          <button
            className={`border-2 border-[#13384E] text-[#13384E] font-semibold px-6 sm:px-8 py-3 rounded-md hover:bg-[#13384E] hover:text-white hover:cursor-pointer transition text-base sm:text-lg hover:shadow-lg hover:shadow-[#13384E]/20 ${
              isVisible ? 'animate-bounce' : ''
            }`}
            style={{
              animation: isVisible ? 'bob 3s ease-in-out infinite 0.5s' : 'none',
            }}
            onClick={() => setSignOpen(true)}
          >
            SIGN UP
          </button>
        </div>

        <div
          className={`w-full md:w-1/2 mt-8 md:mt-0 relative transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`}
        >
          <Image src={whatWeDoImage} alt="What We Do" className="w-full rounded-lg shadow-xl" />
          <Image
            src={leaf}
            alt="Leaf"
            className={`absolute w-24 sm:w-32 md:w-40 lg:w-48 -bottom-4 sm:-bottom-6 md:-bottom-8 -left-8 sm:-left-12 md:-left-20 transition-all duration-1000 ease-out ${
              isVisible ? 'animate-bounce' : ''
            }`}
            style={{
              animation: isVisible ? 'bob 3s ease-in-out infinite 1s' : 'none',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes bob {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>

      <SignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
    </div>
  )
}
