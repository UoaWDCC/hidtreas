'use client'

import { Kosugi_Maru } from 'next/font/google'
import { useState } from 'react'

const kosugiMaru = Kosugi_Maru({
  subsets: ['latin'],
  weight: '400',
})

const tabs = ['Explore', 'Explore by Region', 'Explore by blog type']

export default function Search() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center justify-center">
      <h2
        className={`${kosugiMaru.className} text-center text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold`}
      >
        BLOGS
      </h2>
      <nav className="flex justify-center gap-6 lg:gap-10 text-[0.5rem] sm:text-[0.75rem] md:text-[1rem] lg:text-[1.25rem] font-bold mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`transition-all duration-200 pb-1 cursor-pointer ${
              activeTab === tab
                ? 'underline underline-offset-4'
                : 'hover:underline hover:underline-offset-4'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className="w-full max-w-4xl px-4 mb-10 sm:px-6 lg:px-8">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full px-6 py-3 sm:py-4 rounded-full border-2 border-transparent ring-1 ring-[#13384e] focus:border-[#13384e] focus:outline-none text-sm sm:text-base placeholder-gray-500"
        />
      </div>
    </div>
  )
}
