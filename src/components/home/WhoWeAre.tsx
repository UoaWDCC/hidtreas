'use client'
import Image from 'next/image'
import groupPic from '@/assets/groupPic.png'
import placeholder from '@/assets/placeholderGroupPic.png'
import koru1 from '@/assets/koruAndLeaf.png'
import koru2 from '@/assets/otherKoru.png'
import { useRouter } from 'next/navigation'

export default function WhoWeAre() {
  const router = useRouter()
  return (
    <div className="relative pt-[6rem] pb-[6rem]">
      <div className="flex justify-center">
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold">WHO WE ARE</h2>
      </div>

      <div className="relative flex justify-center">
        <Image src={placeholder} alt="group placeholder" className="w-[65vw] h-auto" />

        <Image
          src={koru1}
          alt="koru & leaf"
          className="absolute bottom-[-60%] left-[0%] w-[33vw] h-auto"
        />

        <Image src={koru2} alt="koru" className="absolute top-[-35%] right-[0%] w-[25vw] h-auto" />
      </div>

      <div className="flex justify-end mt-[2vw] pr-[17.5%]">
        <div className="w-[50vw] text-right text-[1.3vw]">
          <p className="leading-tight">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
            quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
            Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo
            eu aenean.
          </p>
          <button
            className=" bg-[#13384E] px-[2rem] py-[0.35rem] rounded-[0.4rem] text-white text-[1.3vw] mt-[2vw] hover:cursor-pointer"
            onClick={() => router.push('/about')}
          >
            FIND OUT MORE
          </button>
        </div>
      </div>
    </div>
  )
}
