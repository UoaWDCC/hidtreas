'use client'
import Image from 'next/image'
import { Covered_By_Your_Grace } from 'next/font/google'

import blueWave from '@/assets/blue_wave.png'
import bigFeather from '@/assets/big_feather.png'

import { AboutPageImage } from '@/payload-types'
import { getPayloadImageUrl } from '@/utils/image'

const coveredByYourGrace = Covered_By_Your_Grace({
  subsets: ['latin'],
  weight: '400',
})

interface QuoteSectionProps {
  quoteImage: AboutPageImage[]
}

export default function QuotesSection({ quoteImage }: QuoteSectionProps) {
  // Fixed: Added optional chaining to prevent crashes if array is empty
  const image = quoteImage?.[0]?.image
  // ✅ Use 'card' size (768px) for quote section image
  const imageUrl = getPayloadImageUrl(image, 'card') ?? ''

  // Log error if no image
  if (!imageUrl) {
    console.error('Quote section image not loaded from Payload CMS')
  }
  return (
    <section className="py-8  md:py-12">
      <div className="relative w-full min-h-[70vh] mb-[3rem]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Henna Being Drawn"
            fill
            className="object-cover object-center opacity"
            sizes="100vw"
            quality={75}
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#13384E] to-[#0a2638]" />
        )}

        {/* Blue wave decoration - top */}
        <div className="absolute -top-[10vh] right-[20%] z-20">
          <Image
            src={blueWave}
            alt="Blue wave decoration"
            width={110}
            height={80}
            className="w-[7.5rem] sm:w-[8rem] md:w-[9rem] h-auto"
            quality={80}
          />
        </div>

        {/* Quote Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-[1rem] sm:px-[1.5rem] md:px-[2rem]">
          <div className="max-w-[60rem] w-[90%] text-center">
            <blockquote
              className={`${coveredByYourGrace.className} text-white text-[2rem] sm:text-[3rem] md:text-[3.5rem]`}
            >
              {/*make the text stand out a bit more from background*/}
              "Let the wisdom of the past guide the hope of the future—every person is a hidden
              treasure waiting to shine."
            </blockquote>
          </div>
        </div>

        {/* Big feather decoration - bottom left */}
        <div className="absolute top-full left-[2.5rem] md:left-[3.5rem] lg:left-[5rem] -translate-y-1/2 z-20">
          <Image
            src={bigFeather}
            alt="Feather decoration"
            width={150}
            height={190}
            className="w-[6rem] sm:w-[7rem] md:w-[8rem] lg:w-[9rem] h-auto -scale-x-100 -rotate-20 opacity-100"
            quality={80}
          />
        </div>
      </div>
    </section>
  )
}
