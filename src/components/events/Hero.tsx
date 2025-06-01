import Image from 'next/image'
import landscapePlaceholder from '@/assets/landscape_placeholder.png'
import blueKoru from '@/assets/blue_koru.png'

export default function Hero() {
  return (
    <div className="relative pt-32 pb-16">
      {/* Hero */}
      <div className="relative flex justify-center">
        <div className="w-full relative flex justify-center">
          {/* Image */}
          <Image
            src={landscapePlaceholder}
            alt="Events page main image"
            className="h-[60vh] w-[80vw] rounded-4xl"
          />

          {/* Decorative elements */}
          <Image
            src={blueKoru}
            alt="Blue Koru decoration"
            className="absolute top-[-20%] right-[0] w-[20vw] -rotate-180"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center">
          <h1 className="text-[1.875rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[5.2rem] font-extrabold leading-tight tracking-wide mt-[0.125rem] -translate-y-8">
            EVENTS
          </h1>
          {/* Descriptive text */}
        </div>

        <div className="flex justify-end w-[89vw]">
        <div className="w-full flex justify-end text-right ">
          <div className="w-[50vw]">
            <p className="mt-4 text-[0.75rem rem] sm:text-[0.875remrem] md:text-[1rem] lg:text-[1.125rem] font-normal ">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
              quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
              Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo
              eu aenean.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
