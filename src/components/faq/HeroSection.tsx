import Image from 'next/image'
import waveBackground from '@/assets/waveBackground.png'
import placeholder from '@/assets/placeholder.jpg'

export default function HeroSection() {
  return (
    <div className="relative min-h-[80vh] mb-16">
      <div className="absolute bottom-0 right-0 w-[75%] h-[75%]">
        <Image
          src={waveBackground}
          alt="Blue Wave with white koru and leaves"
          fill
          className="object-contain object-bottom-right"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-6xl font-bold mb-8 pt-10">FAQ</h1>
        <div className="flex flex-col w-275">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src={placeholder}
              alt="Placeholder Image"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="text-right">
            <p>
              Pulvinar vivamus fringilla lacus nec metus bibendum egestas. <br />
              Iaculis massa nisl malesuada lacinia integer nunc posuere. <br />
              Ut hendrerit semper vel.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
