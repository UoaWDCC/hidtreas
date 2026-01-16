import Image from 'next/image'
import { AboutPageImage } from '@/payload-types'
import { getPayloadImageUrl } from '@/utils/image'

interface HeroSectionProps {
  heroImage: AboutPageImage[]
}

export default function Hero({ heroImage }: HeroSectionProps) {
  const image = heroImage?.[0]?.image
  const imageUrl = getPayloadImageUrl(image, 'hero') ?? ''

  return (
    <div className="mb-[3rem] md:mb-[8rem]">
      {/* Hero */}
      <div className="relative flex justify-center">
        <div className="flex flex-col md:flex-row h-auto w-full ">
          {/*className="object-cover object-left opacity-70"*/}
          <div className="w-full md:w-1/2 h-64 md:h-screen overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={1000}
                height={1000}
                alt="Hidden Treasure People"
                className="w-full h-full object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                <p className="text-white text-xl">Loading image...</p>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start justify-center p-6 md:p-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight tracking-wide mt-0 -translate-y-2">
              ABOUT US
            </h1>
            {/* Descriptive text */}
            <div className="w-full md:w-[80%]">
              <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-normal text-left">
                We operate with empathy, inclusion, and integrity. Our Trust fosters connections
                across cultures and generations, values collaboration, and prioritises grassroots
                community action. A vision of sustainability, unity, and resilience guides our work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
