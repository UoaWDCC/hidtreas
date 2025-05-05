import Image from 'next/image'
import whoWeAre from '@/assets/tempteamwhoweare.jpg'


export default function WhoWeAre() {
  return (
    <div>
      <p className="flex justify-center text-lg">WHO WE ARE</p>
      <Image
        src={whoWeAre}
        alt="Who We Are"
        width={500}
        height={500}
        className="mx-auto my-4 rounded-lg"
      />
    </div>
  )
}
