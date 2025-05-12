import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="px-8 md:px-24 py-4 bg-[#fdf4ed]">
      <div className="relative rounded-b-[75px] overflow-hidden w-full min-h-[500px] aspect-[16/9]">
        <Image
          src="/elderly.jpg"
          alt="Elderly"
          fill
          className="object-cover object-center rounded-b-[75px]"
          priority
        />
        <div className="absolute inset-0 bg-white/60 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-start justify-start pl-8 md:pl-32 pt-24 md:pt-35">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">
            {/* Logo (left) */}
            <div className="flex-shrink-0">
              <Image
                src="/sharpened_logo.png"
                alt="Logo"
                width={450}
                height={450}
                className="w-[450px] md:w-[450px] h-auto"
              />
            </div>

            {/* Text Content (right) */}
            <div className="flex-1 text-center md:text-left max-w-xl">
              <h1 className="text-[5.2rem] font-extrabold text-[#13384E] leading-tight tracking-wide">
                HIDDEN
                <br />
                TREASURE
              </h1>
              <p className="mt-4 text-[1.4rem] md:text-[1.6rem] text-[#13384E] font-normal">
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
