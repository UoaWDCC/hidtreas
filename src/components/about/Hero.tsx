import Image from 'next/image'
import peoplePlaceholder from '@/assets/people_placeholder.png'

export default function Hero() {
  return (
    <div>
      {/* Hero */}
      <div className="relative flex justify-center">
        <div className="w-full relative flex">
          {/* Image */}
          <Image
            src={peoplePlaceholder}
            alt="Hidden Treasure People" // Actual image should be wider than placeholder
            className="object-contain w-[auto] h-screen max-w-[50vw]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-[1.875rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[5.2rem] font-extrabold leading-tight tracking-wide mt-[0.125rem] -translate-y-8">
              ABOUT US
            </h1>
            {/* Descriptive text */}
            <div className="w-[50vw]">
              <p className="mt-4 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.6rem] font-normal text-center">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
                quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
                Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus
                leo eu aenean.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
