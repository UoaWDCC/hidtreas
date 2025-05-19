import Image, { StaticImageData } from 'next/image'
import profilePic from '@/assets/personPicture.png'
import koru from '@/assets/bigGreenKoru.png'
import kiwi from '@/assets/kiwiBird.svg'

export default function MeetTheTeam() {
  return (
    <div className="relative pt-[6rem] pb-[6rem]  ">
      {/* whole section */}
      <Image
        src={koru}
        alt="Koru"
        className="absolute left-[-2%] top-3/4 -translate-x-0 -translate-y-1/2 w-[35vw] h-auto rotate-90 z-[-10]"
      />

      <div className="flex justify-center ">
        {/* heading */}
        <div className="mt-[9vw]">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold">Meet the Team!</h2>
        </div>
        <Image
          src={kiwi}
          alt="Kiwi"
          className="flex top-[5%] right-[20%] w-[9vw] h-auto scale-x-[-1]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-10 ">
        {/* whole grid */}

        <div className="mt-[9vw] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[10vw] px-[5vw]">
          <TeamMember name="Alice" role="Founder" image={profilePic} />
          <TeamMember name="Bob" role="Founder" image={profilePic} />
          <TeamMember name="Claire" role="Founder" image={profilePic} />
          <TeamMember name="Denise" role="Founder" image={profilePic} />
          <TeamMember name="Eve" role="Founder" image={profilePic} />
          <TeamMember name="Fred" role="Founder" image={profilePic} />
          <TeamMember name="Greg" role="Founder" image={profilePic} />
          <TeamMember name="Hank Green!" role="Founder" image={profilePic} />
        </div>
      </div>
    </div>
  )
}

function TeamMember({ name, role, image }: { name: string; role: string; image: StaticImageData }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* image */}
      <Image src={image} alt={`${name}'s photo`} className="w-[clamp(4rem,20vw,10rem)] h-auto" />

      {/* text stuff */}
      <p className="text-[clamp(1rem,4vw,2rem)]">{name}</p>
      <p className="text-[clamp(0.8rem,2.5vw,1.7rem)]">{role}</p>
    </div>
  )
}
