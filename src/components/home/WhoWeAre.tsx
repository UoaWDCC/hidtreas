'use client'
import Image from 'next/image'
import groupPic from '@/assets/groupPic.png'
import whoWeAreImage from '@/assets/hidtreas-who-we-are.jpg'
import koru1 from '@/assets/koruAndLeaf.png'
import koru2 from '@/assets/otherKoru.png'
import { useRouter } from 'next/navigation'

export default function WhoWeAre() {
  const router = useRouter()
  return (
    <div className="relative pt-[5rem] pb-[5rem]">
      <div className="flex justify-center">
        <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold">WHO WE ARE</h2>
      </div>

      <div className="relative flex justify-center">
        <Image src={whoWeAreImage} alt="Who We Are" className="w-[52vw] h-auto rounded-lg" />

        <Image
          src={koru1}
          alt="koru & leaf"
          className="absolute bottom-[-60%] left-[0%] w-[28vw] h-auto"
        />

        <Image src={koru2} alt="koru" className="absolute top-[-35%] right-[0%] w-[20vw] h-auto" />
      </div>

      <div className="flex justify-end mt-[2vw] pr-[24%]">
        <div className="w-[52vw] text-right text-[1.2vw]">
          <p className="leading-tight">
            We are Hidden Treasure Trust, a charitable organization supporting families, women,
            seniors, and youth in South Auckland. Our mission is to empower communities through
            practical support, cultural engagement, and sustainability initiatives. We are
            passionate about blending generations, knowledge, and compassion to uplift lives.
          </p>
          <button
            className=" bg-[#13384E] px-[1.75rem] py-[0.3rem] rounded-[0.4rem] text-white text-[1.2vw] mt-[2vw] hover:cursor-pointer"
            onClick={() => router.push('/about')}
          >
            FIND OUT MORE
          </button>
        </div>
      </div>
    </div>
  )
}
