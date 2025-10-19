'use client'

import Image from 'next/image'
import { useState } from 'react'
import nasz from '@/assets/sharpened_logo.png'
import SignUpModal from './SignUpModal'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signOpen, setSignOpen] = useState(false)

  return (
    <header className="px-4 sm:px-6 md:px-12 lg:px-16 py-[0.6rem] flex items-center justify-between relative">
      {/* Logo + Brand */}
      {/* Logo + Brand — Wrapped in Link to home */}
      <Link
        href="/"
        className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 animate-slide-in-left hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <Image
          src={nasz}
          alt="Hidden Treasure Logo"
          width={48}
          height={48}
          className="w-[3rem] h-[3rem] sm:w-[3.25rem] sm:h-[3.25rem] md:w-[3.5rem] md:h-[3.5rem] lg:w-[4rem] lg:h-[4rem]"
          priority
          quality={90}
        />
        <h1 className="text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.35rem] font-semibold tracking-wide antialiased">
          HIDDEN TREASURE
        </h1>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-[2.5rem] h-[2.5rem] p-[0.5rem] animate-slide-in-right"
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
      <nav className="hidden lg:flex items-center space-x-[1.5rem] xl:space-x-[2rem] font-medium text-[1rem] md:text-[1.125rem] antialiased">
        <h1 className="animate-slide-in-right animate-stagger-1">
          <Link href="/" className="hover:underline uppercase tracking-wide hover-lift">
            Home
          </Link>
        </h1>
        <h1 className="animate-slide-in-right animate-stagger-2">
          <Link href="/about" className="hover:underline uppercase tracking-wide hover-lift">
            About Us
          </Link>
        </h1>
        {/* Blogs currently links to 404 not found */}
        <h1 className="animate-slide-in-right animate-stagger-3">
          <Link href="/blogs" className="hover:underline uppercase tracking-wide hover-lift">
            Blogs
          </Link>
        </h1>
        {/* Events currently links to 404 not found */}
        <h1 className="animate-slide-in-right animate-stagger-4">
          <Link href="/events" className="hover:underline uppercase tracking-wide hover-lift">
            Events
          </Link>
        </h1>
        <h1 className="animate-slide-in-right animate-stagger-5">
          <button
            className="bg-[#13384E] text-white px-[1.25rem] md:px-[1.5rem] xl:px-[1.75rem] py-[0.6rem] md:py-[0.75rem] rounded-md text-[1rem] md:text-[1.125rem] font-medium hover:bg-[#0a2638] hover:cursor-pointer transition hover-lift"
            onClick={() => setSignOpen(true)}
          >
            SIGN UP
          </button>
        </h1>
      </nav>

      {/* Mobile Navigation Menu - Slide Down */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 lg:hidden animate-slide-in-top">
          <div className="flex flex-col items-center py-[1rem] space-y-[1rem]">
            <Link href="/" className="uppercase tracking-wide font-medium hover-lift">
              Home
            </Link>
            <Link href="/about" className="uppercase tracking-wide font-medium hover-lift">
              About Us
            </Link>
            <Link href="/blogs" className="uppercase tracking-wide font-medium hover-lift">
              Blogs
            </Link>
            <Link href="/events" className="uppercase tracking-wide font-medium hover-lift">
              Events
            </Link>
            <button
              className="bg-[#13384E] text-white px-[1.75rem] py-[0.5rem] rounded-md font-medium hover:bg-[#0a2638] hover:cursor-pointer transition hover-lift"
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
