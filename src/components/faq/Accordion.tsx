'use client'

import { useState } from 'react'

interface AccordionItem {
  title: string
  content: string
}

const items: AccordionItem[] = [
  {
    title: 'What is Hidden Treasure?',
    content:
      'Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.',
  },
  {
    title: 'A very fascinating question?',
    content: 'Answer to a very fascinating question.',
  },
  {
    title: 'Another very fascinating question?',
    content: 'Answer to another very fascinating question.',
  },
  {
    title: 'An extremely shocking question?',
    content: 'Answer to an extremely shocking question.',
  },
  {
    title: 'How can I get involved?',
    content: 'You can volunteer, donate, or participate in events.',
  },
  {
    title: 'What kind of support do you offer?',
    content: 'Transport, food/clothing donations, workshops.',
  },
  {
    title: 'Are your programs free?',
    content: 'Yes, all programs are free and open to the public.',
  },
  {
    title: 'How do I request assistance?',
    content: 'Contact us by email or Facebook.',
  },
  {
    title: 'Do you support people outside Auckland?',
    content: 'At present, our focus is on South Auckland, but we welcome collaboration.',
  },
  {
    title: 'Do you accept donations?',
    content:
      'Yes, we accept financial donations as well as items like clothes and toys. As per our activity needs.',
  },
]

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-[#fdf4ed] border-0">
      {items.map((item, index) => (
        <div key={index} className="border-t">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center py-4"
          >
            <span className="text-xl font-bold">{item.title}</span>
            <span className="text-2xl font-bold shrink-0">{openIndex === index ? '−' : '+'}</span>
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden text-m w-full break-words ${
              openIndex === index ? 'max-h-40 pb-4' : 'max-h-0 pb-0'
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
