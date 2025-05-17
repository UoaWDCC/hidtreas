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
    <div className="h-screen w-screen px-40 pt-20">
      {items.map((items, index) => (
        <div key={index} className="border-t">
          <button
            className="w-full text-left px-4 py-2 hover:bg-[#e6dcd5]"
            onClick={() => toggle(index)}
          >
            <div className="flex flex-row justify-between">
              <span className="font-bold">{items.title}</span>
              <span className="text-xl font-bold">{openId === index ? '-' : '+'}</span>
            </div>
          </button>
          {openId === index && <div className="px-4 py-2">{items.content}</div>}
        </div>
      ))}
    </div>
  )
}
