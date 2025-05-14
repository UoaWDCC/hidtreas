import Image from 'next/image'
import whoWeAre from '@/assets/tempteamwhoweare.jpg'
import koruLeaf from '@/assets/koruleaf.png'
import otherKoru from '@/assets/otherkoru.png'

export default function WhoWeAre() {
  return (
    <div className="relative w-full">
      <p className="flex justify-center text-[80px] font-bold">WHO WE ARE</p>

      <div className="absolute left-0 bottom-[15%] w-[30vw] z-10">
        <Image
          src={koruLeaf}
          alt="Koru and Leaf"
          layout="intrinsic"
          width={450}
          height={250}
          className="w-full h-auto"
        />
      </div>

      <div className="absolute top-[12%] right-0 w-[25vw] z-10">
        <Image
          src={otherKoru}	
          alt="Other Koru"
          width={370}
          height={490}
          className="mx-auto my-4"
        />
      </div>

      <div className="relative w-[65vw] mx-auto my-8">
        <Image
          src={whoWeAre}
          alt="Who We Are"
          className=" w-full h-auto  rounded-3xl"
        />
      </div>

      <div className="w-[65vw] mx-auto flex justify-end mt-4">
        <p className="text-right text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-prose">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque
          faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id
          cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.
        </p>
      </div>

      <div className="w-[65vw] mx-auto mt-4 text-right">
        <button
          className="px-6 py-2 bg-blue-900 text-white rounded-lg shadow-md hover:bg-blue-800"
        >
          FIND OUT MORE
        </button>
      </div>
      
      

    </div>
  )
}
