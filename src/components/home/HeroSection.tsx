import elderly from '/public/elderly.jpg'
import logo from '/public/biggerlogo.png'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="flex flex-col items-centerpx-4 sm:px-8 md:px-12 lg:px-24 xl:px-36 2xl:px-48">
      <div className="relative w-full aspect-video overflow-hidden rounded-b-3xl">
        <Image 
          src={elderly} 
          alt="Elderly couple smiling" 
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        
        <div className="absolute inset-0 flex items-center p-4 sm:p-8">
          <div className="w-1/2 flex justify-center">
            <Image 
              src={logo} 
              alt="Hidden Treasure Logo"
              width={400}
              height={400}
            />
          </div>

          <div className="w-1/3 pl-4">
            <h1 className="mt-15 text-8xl font-bold text-left">
              HIDDEN<br />TREASURE
            </h1>
            <p className="mt-6 text-lg text-left max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et.
            </p>
            <button className="mt-8 bg-[#13384E] text-white font-bold px-8 py-2 rounded-lg transition-colors">
              JOIN US
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}