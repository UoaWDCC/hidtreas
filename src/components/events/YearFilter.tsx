'use client'

import React from 'react'

const BASE_BTN =
  'font-bold text-l md:text-xl lg:text-2xl text-[#13384E] border-2 rounded-2xl gap px-2 cursor-pointer'
const NORMAL_BTN = 'bg-[#FFF8F3] border-[#13384E]'
const SELECTED_BTN = 'bg-[#13384E] text-white'

type Props = {
  years?: number[]
  selectedYear?: number | null
  onSelectYear?: (year: number | null) => void
}

export default function YearFilter({
  years = [],
  selectedYear = null,
  onSelectYear = () => {},
}: Props) {
  return (
    <div className="w-[90vw] max-w-[90vw] justify-center flex flex-row gap-10">
      <p className="font-bold text-l md:text-xl lg:text-2xl">YEAR</p>
      <div className="flex min-w-0 flex-row overflow-x-auto no-scrollbar gap-5">
        {years.map((y) => {
          const isSelected = selectedYear === y
          return (
            <button
              key={y}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectYear(isSelected ? null : y)}
              className={`${BASE_BTN} ${isSelected ? SELECTED_BTN : NORMAL_BTN}`}
            >
              {y}
            </button>
          )
        })}
      </div>
    </div>
  )
}
