'use client'

import Image from 'next/image'
import { useState } from 'react'
import nasz from '@/assets/sharpened_logo.png'
import SignUpModal from './SignUpModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signOpen, setSignOpen] = useState(false)

  return (
    <header className="px-4 md:px-16 py-[0.6rem] flex items-center justify-between relative">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-2 md:space-x-3">
        <Image
          src={nasz}
          alt="Hidden Treasure Logo"
          width={48}
          height={48}
          className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem]"
        />
        <h1 className="text-[1rem] md:text-[1.35rem] font-semibold tracking-wide antialiased">
          HIDDEN TREASURE
        </h1>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-[2.5rem] h-[2.5rem] p-[0.5rem]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <span
          className={`w-[1.5rem] h-[0.125rem] bg-[#13384E] transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-[0.375rem]' : 'mb-[0.375rem]'}`}
        ></span>
        <span
          className={`w-[1.5rem] h-[0.125rem] bg-[#13384E] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'mb-[0.375rem]'}`}
        ></span>
        <span
          className={`w-[1.5rem] h-[0.125rem] bg-[#13384E] transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-[0.375rem]' : ''}`}
        ></span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-[2.5rem] font-medium text-[1.125rem] antialiased">
        <h1>
          <a href="#about" className="hover:underline uppercase tracking-wide">
            About Us
          </a>
        </h1>
        <h1>
          <a href="#blogs" className="hover:underline uppercase tracking-wide">
            Blogs
          </a>
        </h1>
        <h1>
          <a href="#events" className="hover:underline uppercase tracking-wide">
            Events
          </a>
        </h1>
        <h1>
          <button
            className="bg-[#13384E] text-white px-[1.75rem] py-[0.75rem] rounded-md text-[1.125rem] font-medium hover:bg-[#0a2638] transition"
            onClick={() => setSignOpen(true)}
          >
            SIGN UP
          </button>
        </h1>
      </nav>

      {/* Mobile Navigation Menu - Slide Down */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden">
          <div className="flex flex-col items-center py-[1rem] space-y-[1rem]">
            <a href="#about" className="uppercase tracking-wide font-medium">
              About Us
            </a>
            <a href="#blogs" className="uppercase tracking-wide font-medium">
              Blogs
            </a>
            <a href="#events" className="uppercase tracking-wide font-medium">
              Events
            </a>
            <button
              className="bg-[#13384E] text-white px-[1.75rem] py-[0.5rem] rounded-md font-medium hover:bg-[#0a2638] transition"
              onClick={() => setSignOpen(true)}
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      <SignUpModal signOpen={signOpen} setSignOpen={setSignOpen} />
    </header>
  )
}
