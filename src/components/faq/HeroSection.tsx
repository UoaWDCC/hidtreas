import Image from 'next/image'
import waveBackground from '@/assets/waveBackground.png'
import heroImage from '@/assets/faqheroimage.jpg'

export default function HeroSection() {
  return (
    <div className="relative min-h-[80vh] mb-5">
      <div className="absolute bottom-0 right-0 w-[100%] h-[100%] -m-30">
        <Image
          src={waveBackground}
          alt="Blue Wave with white koru and leaves"
          fill
          className="object-contain object-bottom-right"
        />
      </div>

      <div className="relative z-10 container">
        <h1 className="text-6xl font-bold pt-10 pl-50">FAQ</h1>
        <div className="flex flex-col width-70%">
          <div className="relative h-90 rounded-lg overflow-hidden">
            <Image
              src={heroImage}
              alt="Hero Image"
              fill
              priority
              className="object-cover object-[center_35%]" // move image content down
            />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">
              "Let the wisdom of the past guide the hope of the future—every person is a hidden
              treasure waiting to shine."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
