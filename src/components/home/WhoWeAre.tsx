'use client'
import Image from 'next/image'
import groupPic from '@/assets/groupPic.png'
import whoWeAreImage from '@/assets/hidtreas-who-we-are_upscaled.png'
import koru1 from '@/assets/koruAndLeaf.png'
import koru2 from '@/assets/otherKoru.png'
import { useRouter } from 'next/navigation'
import AnimatedSection from '../common/AnimatedSection'
import { HomePageImage } from '@/payload-types'
import { getPayloadImageUrl } from '@/utils/image'

interface WhoWeAreProps {
  whoWeAreImage: HomePageImage[]
}

export default function WhoWeAre({ whoWeAreImage }: WhoWeAreProps) {
  const router = useRouter()
  const image = whoWeAreImage[0].image
  const imageUrl = getPayloadImageUrl(image) ?? ''

  return (
    <div className="relative pt-12 sm:pt-16 md:pt-[5rem] pb-12 sm:pb-16 md:pb-[5rem] px-4 sm:px-0 overflow-x-hidden overflow-y-visible">
      <AnimatedSection animationClass="animate-slide-in-top">
        <div className="flex justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,5vw,3.5rem)] font-bold">
            WHO WE ARE
          </h2>
        </div>
      </AnimatedSection>

      <AnimatedSection animationClass="animate-slide-in-left" delay={0.2}>
        <div className="relative flex justify-center mt-8 sm:mt-12 md:mt-0">
          <Image
            src={imageUrl}
            alt="Who We Are"
            width={200}
            height={200}
            className="w-full max-w-md sm:w-[52vw] md:max-w-none md:w-[55vw] h-auto rounded-lg"
          />

          <Image
            src={koru1}
            alt="koru & leaf"
            className="absolute bottom-[-20%] sm:bottom-[-40%] left-[0%] w-20 sm:w-[28vw] h-auto animate-gentle-rotate"
          />

          <Image
            src={koru2}
            alt="koru"
            className="absolute top-[-20%] sm:top-[-30%] right-[0%] w-16 sm:w-[20vw] h-auto animate-gentle-rotate animate-stagger-2"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection animationClass="animate-slide-in-right" delay={0.4}>
        <div className="flex justify-center md:justify-end mt-8 sm:mt-12 md:mt-[2vw] md:pr-[22.5%]">
          <div className="w-full max-w-2xl md:w-[52vw] text-center md:text-right text-base sm:text-lg">
            <p className="leading-relaxed sm:leading-tight">
              We are Hidden Treasure Trust, a charitable organization supporting families, women,
              seniors, and youth in South Auckland. Our mission is to empower communities through
              practical support, cultural engagement, and sustainability initiatives. We are
              passionate about blending generations, knowledge, and compassion to uplift lives.
            </p>
            <button
              className="bg-[#13384E] px-6 sm:px-8 py-3 rounded-lg text-white text-base sm:text-lg mt-6 hover:cursor-pointer animate-bob hover-lift"
              onClick={() => router.push('/about')}
            >
              FIND OUT MORE
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
