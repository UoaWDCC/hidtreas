import Image from 'next/image'
import whoWeAre from '@/assets/tempteamwhoweare.jpg'
import koruLeaf from '@/assets/koruleaf.png'
import otherKoru from '@/assets/otherkoru.png'

export default function WhoWeAre() {
  return (
    <div>
      <p className="flex justify-center text-[80px]">WHO WE ARE</p>

      <Image
        src={whoWeAre}
        alt="Who We Are"
        width={993}
        height={523}
        className="mx-auto my-4 rounded-lg"
      />
      <div className="absolute right-75 w-[700px] mt-4">
        <p className="text-[20px] text-justify">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque
          faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id
          cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="absolute top-260 right-75 px-15 py-2 bg-blue-900 text-white rounded-lg shadow-md hover:bg-blue-800"
        >
          FIND OUT MORE
        </button>
      </div>

      <div className="absolute top-195 left-10 z-10">
        <Image
          src={koruLeaf}
          alt="Koru and Leaf"
          width={550}
          height={350}
          className="mx-auto my-4"
        />
      </div>

      <div className="absolute top-10 right-20 z-10">
        <Image
          src={otherKoru}	
          alt="Other Koru"
          width={370}
          height={490}
          className="mx-auto my-4"
        />
      </div>
    </div>
  )
}
