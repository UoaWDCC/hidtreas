'use client'
import { useState } from 'react'

type AccordionItem = {
  title: string
  content: string
}

type Props = {
  items: AccordionItem[]
}

export default function SecondAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="h-140 w-screen px-40 pt-20">
      {items.map((items, index) => (
        <div key={index} className="border-t">
          <button
            className="w-full text-left px-4 py-2 cursor-pointer"
            onClick={() => toggle(index)}
          >
            <div className="flex flex-row justify-between">
              <h3 className="font-bold">{items.title}</h3>
              <span className="text-2xl font-bold">{openId === index ? '-' : '+'}</span>
            </div>
          </button>
          <div
            className={`px-4 pt-2 overflow-hidden transition-all duration-300 ease-in-out ${
              index === openId
                ? 'opacity-100 max-h-96 pb-8'
                : 'opacity-0 max-h-0 pointer-events-auto'
            }`}
          >
            {items.content}
          </div>
        </div>
      ))}
    </div>
  )
}
