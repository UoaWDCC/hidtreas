'use client'

import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import nasz from '@/assets/logo.webp'
import SignUpModal from './SignUpModal'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signOpen, setSignOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/events', label: 'Events' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="px-4 sm:px-6 md:px-12 lg:px-16 py-[0.6rem] flex items-center justify-between relative">
      {/* Logo + Brand */}
      {/* Logo + Brand — Wrapped in Link to home */}
      <Link
        href="/"
        className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3"
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
        className="lg:hidden flex flex-col justify-center items-center w-[2.5rem] h-[2.5rem] p-[0.5rem]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <span
          className={`w-[1.5rem] h-[0.125rem] bg-primary transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-[0.375rem]' : 'mb-[0.375rem]'}`}
        ></span>
        <span
          className={`w-[1.5rem] h-[0.125rem] bg-primary transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'mb-[0.375rem]'}`}
        ></span>
        <span
          className={`w-[1.5rem] h-[0.125rem] bg-primary transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-[0.375rem]' : ''}`}
        ></span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-[1.5rem] xl:space-x-[2rem] font-medium text-[1rem] md:text-[1.125rem] antialiased">
        {navLinks.map((link, i) => (
          <h1 key={link.href}>
            <Link
              href={link.href}
              className={`uppercase tracking-wide hover:underline ${isActive(link.href) ? 'underline' : ''}`}
            >
              {link.label}
            </Link>
          </h1>
        ))}
        <h1>
          <button
            className="bg-primary text-white px-[1.25rem] md:px-[1.5rem] xl:px-[1.75rem] py-[0.6rem] md:py-[0.75rem] rounded-md text-[1rem] md:text-[1.125rem] font-medium hover:bg-primary-hover hover:cursor-pointer transition"
            onClick={() => setSignOpen(true)}
          >
            SIGN UP
          </button>
        </h1>
      </nav>

      {/* Mobile Navigation Menu - Slide Down */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 lg:hidden">
          <div className="flex flex-col items-center py-[1rem] space-y-[1rem]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`uppercase tracking-wide font-medium ${isActive(link.href) ? 'underline' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="bg-primary text-white px-[1.75rem] py-[0.5rem] rounded-md font-medium hover:bg-primary-hover hover:cursor-pointer transition"
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
