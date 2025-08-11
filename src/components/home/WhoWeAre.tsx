'use client'
import Image from 'next/image'
import groupPic from '@/assets/groupPic.png'
import whoWeAreImage from '@/assets/hidtreas-who-we-are.jpg'
import koru1 from '@/assets/koruAndLeaf.png'
import koru2 from '@/assets/otherKoru.png'
import { useRouter } from 'next/navigation'
import AnimatedSection from '../common/AnimatedSection'

export default function WhoWeAre() {
  const router = useRouter()
  return (
    <div className="relative pt-12 sm:pt-16 md:pt-[5rem] pb-12 sm:pb-16 md:pb-[5rem] px-4 sm:px-0 overflow-x-hidden overflow-y-visible">
      <AnimatedSection animationClass="animate-slide-in-top">
        <div className="flex justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,5vw,3.5rem)] font-bold text-glow">
            WHO WE ARE
          </h2>
        </div>
      </AnimatedSection>

      <AnimatedSection animationClass="animate-slide-in-left" delay={0.2}>
        <div className="relative flex justify-center mt-8 sm:mt-12 md:mt-0">
          <Image
            src={whoWeAreImage}
            alt="Who We Are"
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
          <div className="w-full max-w-2xl md:w-[52vw] text-center md:text-right text-sm sm:text-base md:text-[1.2vw]">
            <p className="leading-relaxed sm:leading-tight text-glow">
              We are Hidden Treasure Trust, a charitable organization supporting families, women,
              seniors, and youth in South Auckland. Our mission is to empower communities through
              practical support, cultural engagement, and sustainability initiatives. We are
              passionate about blending generations, knowledge, and compassion to uplift lives.
            </p>
            <button
              className="bg-[#13384E] px-6 sm:px-[1.75rem] py-2 sm:py-[0.3rem] rounded-lg sm:rounded-[0.4rem] text-white text-sm sm:text-base md:text-[1.2vw] mt-4 sm:mt-[2vw] hover:cursor-pointer animate-bob hover-lift"
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
