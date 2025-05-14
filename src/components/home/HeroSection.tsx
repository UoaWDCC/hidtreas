import Image from 'next/image'
import elderlyImage from '@/assets/elderly.jpg'
import logoImage from '@/assets/sharpened_logo.png'

export default function HeroSection() {
  return (
    <section className="px-8 md:px-24 py-1">
      <div className="relative rounded-b-[5.5rem] overflow-hidden w-98% min-h-[350px] aspect-[16/7.5]">
        <Image
          src={elderlyImage}
          alt="Elderly"
          fill
          className="object-cover object-center rounded-b-[5.5rem]"
          priority
        />
        <div className="absolute inset-0 bg-white/60 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-start justify-start pl-8 md:pl-32 pt-[5.75rem] md:pt-[8.75rem]">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">
            {/* Logo (left) */}
            <div className="flex-shrink-0">
              <Image
                src={logoImage}
                alt="Logo"
                width={400}
                height={400}
                className="w-[18rem] md:w-[25rem] h-auto"
              />
            </div>

            {/* Text Content (right) */}
            <div className="flex-1 text-center md:text-left max-w-xl">
              <h1 className="text-[3.5rem] md:text-[5.2rem] font-extrabold leading-tight tracking-wide">
                HIDDEN
                <br />
                TREASURE
              </h1>
              <p className="mt-4 text-[1.4rem] md:text-[1.6rem] font-normal">
                Preserving the past, inspiring the future.
              </p>
              <button className="mt-6 bg-[#13384E] text-white px-6 py-3 rounded-md text-base md:text-lg font-semibold hover:bg-[#0a2638] transition">
                JOIN US
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
