import Image, { StaticImageData } from 'next/image'
import placeholderImage from '@/assets/personPicture.png'
import koru from '@/assets/bigGreenKoru.png'
import kiwi from '@/assets/kiwiBird.svg'
import { getMembers } from '@/lib/payload/members'
import { MemberType } from '@/types/member'

export default async function MeetTheTeam() {
  const members = await getMembers()

  return (
    <div className="relative mb-[6rem] md:mb-[8rem]">
      {/* whole section */}

      {/*background koru - positioned between sections*/}
      <Image
        src={koru}
        alt="Koru"
        className="absolute left-[-2%] bottom-[10rem] -translate-x-0 w-[25vw] h-auto rotate-90 z-[-10]"
      />

      <div className="flex justify-center ">
        {/* heading */}
        <div className="mt-0">
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

        <div className="mt-[4vw] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[10vw] px-[5vw]">
          {members.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              pronoun={member.pronoun ?? ''}
              role={member.role}
              imageUrl={
                typeof member.image === 'object' && member.image?.url
                  ? member.image.url
                  : placeholderImage
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamMember({ name, pronoun, role, imageUrl }: MemberType) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* image */}

      <div className="relative w-[clamp(4rem,20vw,10rem)] aspect-[4/5] overflow-hidden border-2 border-current rounded-md">
        <Image src={imageUrl} alt={`${name}'s photo`} fill className="object-cover object-top" />
      </div>

      {/* text stuff */}
      <p className="text-[clamp(1rem,4vw,2rem)]">{name}</p>
      <p className="text-[clamp(0.5rem,2vw,1rem)]">{pronoun}</p>
      <p className="text-[clamp(0.8rem,2.5vw,1.6rem)]">{role}</p>
    </div>
  )
}
