'use client'

import InstagramIcon from '@/components/icons/InstagramIcon'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, FormEventHandler, useCallback } from 'react'
import LogoImage from '@/assets/logo.png'

export default function Footer() {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Submitted!')
  }, [])
  return (
    <footer className="relative flex flex-col mt-10 text-[#13384E]">
      <Image
        src={LogoImage}
        alt="Logo"
        className="absolute -top-30 left-10 md:left-25 h-[157px] w-[173px]"
      />
      <div className="grid grid-cols-2 py-10 px-10 md:py-20 md:px-25 gap-10 bg-[#2496B5]  w-full">
        <section className="flex flex-col gap-73">
          <div>
            <h1 className="text-7xl font-bold">Hidden Treasure</h1>
            <h3 className="text-2xl">Preserving the past, inspiring the future.</h3>
          </div>
          <div className="grid gap-4">
            <p className="text-2xl font-bold">Sign up now!</p>
            <form className="relative w-fit" onSubmit={handleSubmit}>
              <input type="email" className="bg-white" required />
              <button type="submit" className="absolute right-3">
                a
              </button>
            </form>
          </div>
        </section>
        <section className="grid grid-cols-3">
          <nav>
            <p className="text-2xl font-bold">Quick Links</p>
            <ul className="mt-3">
              <li>Home</li>
              <li>About Us</li>
              <li>Events</li>
              <li>Blogs</li>
              <li>Our Values</li>
              <li>Contact Us</li>
            </ul>
          </nav>
          <div>
            <p className="text-2xl font-bold">Get involved</p>
            <ul className="mt-3">
              <li>Volunteer</li>
              <li>Donate</li>
              <li>Newsletter Signup</li>
            </ul>
          </div>
          <div>
            <p className="text-2xl font-bold text-nowrap">Stay connected</p>
            <ul className="mt-3">
              <li>
                <a href="tel:+0800-123-436"></a>0800-123-436
              </li>
              <li>
                <a href="mailto:insertemail@gmail.com">insertemail@gmail.com</a>
              </li>
            </ul>
            <div className="bg-[#13384E] rounded-full group p-2 w-fit hover:bg-white hover:border-[#13384E] duration-300">
              <InstagramIcon className="text-white group-hover:text-[#13384E] w-4 h-4" />
            </div>
          </div>
        </section>
      </div>
      <div className="py-2 grid grid-cols-3 ">
        <div></div>
        <div className="place-self-center">hidden treasure</div>
        <div className="place-self-end">hidden treasure</div>
      </div>
    </footer>
  )
}
