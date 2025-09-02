import Image from 'next/image'
import waveBackground from '@/assets/waveBackground.png'
import heroImage from '@/assets/faqheroimage.jpg'

export default function HeroSection() {
  return (
    <div className="relative h-50 md:min-h-[80vh] overflow-x-clip">
      <div className="absolute bottom-[-90px] right-[-80px] w-[100%] h-[70%] md:right-[-90px] md:bottom-[-120px] md:h-[100%] hidden xl:block ">
        <Image
          src={waveBackground}
          alt="Blue Wave with white koru and leaves"
          fill
          className="object-contain object-bottom-right"
        />
      </div>

      <div className="relative z-10 container">
        <h1 className="text-4xl md:text-6xl pl-18 font-bold pt-5 md:pl-34.5">FAQ</h1>
        <div className="flex flex-col width-70%">
          <div className="relative h-70 sm:h-80 md:h-90 rounded-lg overflow-hidden w-auto">
            <Image
              src={heroImage}
              alt="Hero Image"
              fill
              priority
              className="object-cover object-[center_35%]" // move image content down
            />
          </div>
        </div>
      </div>
      <div className="absolute pt-2 lg:left-30 lg:bottom-20">
        <p className="text-xl font-bold text-center md:text-3xl sm:max-w-3xl w-auto px-2 md:px-0">
          "Let the wisdom of the past guide the hope of the future —every person is a hidden
          treasure waiting to shine."
        </p>
      </div>
    </div>
  )
}
