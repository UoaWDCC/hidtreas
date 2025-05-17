'use client'

import { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

const items: AccordionItem[] = [
  {
    title: "What is Hidden Treasure?",
    content:
      "Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.",
  },
  {
    title: "A very fascinating question?",
    content: "Answer to a very fascinating question.",
  },
  {
    title: "Another very fascinating question?",
    content: "Answer to another very fascinating question.",
  },
  {
    title: "An extremely shocking question?",
    content: "Answer to an extremely shocking question.",
  },
];

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-md mx-auto bg-[#fdf4ed] p-4">
      {items.map((item, index) => (
        <div key={index} className="border-y border-gray-300">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center py-4">
            <span className="font-bold">{item.title}</span>
            <span className="text-xl font-bold">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="pb-4">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;

