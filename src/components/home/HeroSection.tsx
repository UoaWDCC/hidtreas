import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="px-8 md:px-24 py-4 bg-[#fdf4ed]">
      <div className="relative rounded-b-[100px] overflow-hidden w-full min-h-[500px] aspect-[16/9]">
        <Image
          src="/elderly.jpg"
          alt="Elderly"
          fill
          className="object-cover object-bottom rounded-b-[100px] scale-x-[-1]"
          priority
        />
        <div className="absolute inset-0 bg-[#ffffff]/40 z-10"></div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center px-8 md:px-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-extrabold text-[#13384E] leading-tight tracking-wide">
              <span className="flex items-center">
                HIDDEN
                <Image src="/logo.PNG" alt="Logo" width={80} height={80} className="ml-3" />
              </span>
              TREASURE
            </h1>
            <p className="mt-6 text-lg md:text-3xl text-[#0b2e42] font-nomral tracking-tight antialiased drop-shadow-sm">
              Preserving the past, inspiring the future.
            </p>
            <button className="mt-8 bg-[#13384E] text-white px-7 py-3 rounded-md text-base md:text-lg font-semibold hover:bg-[#0a2638] transition">
              JOIN US
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
