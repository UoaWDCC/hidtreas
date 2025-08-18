import Image from 'next/image'
import heroImage from '@/assets/aboutUsHeroImage.jpg'
export default function Hero() {
  return (
    <div className="mb-[12rem]">
      {/* Hero */}
      <div className="relative flex justify-center">
        <div className="flex flex-col md:flex-row h-auto w-full ">
          {/* Image */}

          {/*className="object-cover object-left opacity-70"*/}
          <div className="w-full md:w-1/2 h-64 md:h-screen overflow-hidden">
            <Image
              src={heroImage}
              alt="Hidden Treasure People" // Actual image should be wider than placeholder
              className="w-full h-full object-cover object-center"
            />
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
