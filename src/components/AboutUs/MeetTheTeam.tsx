import Image, { StaticImageData } from 'next/image'
import profilePic from '@/assets/personPicture.png'
import koru from '@/assets/bigGreenKoru.png'
import kiwi from '@/assets/kiwiBird.svg'
import induBajwaPic from '@/assets/indu-bajwa-upscaled-profile.png'
import amanGillPic from '@/assets/aman-gill-upscaled-profile.jpeg'
import { getMembers } from '@/lib/payload/members'
import { profileEnd } from 'console'

interface MemberProp {
  name: string
  pronoun: string
  role: string
  imageUrl: string | StaticImageData | null | undefined
  slug?: string
}

export default async function MeetTheTeam() {
  const peopleArray = [
    {
      name: 'Esther Ho',
      pronoun: '(she/her)',
      role: 'Chairperson',
      image: profilePic,
    },
    {
      name: 'Aman Gill',
      pronoun: '(she/her)',
      role: 'Trustees',
      image: amanGillPic,
    },
    {
      name: 'Christine Knock',
      pronoun: '(she/her)',
      role: 'Trustees',
      image: profilePic,
    },
    {
      name: 'Indu Bajwa',
      pronoun: '(she/her)',
      role: 'Manager',
      image: induBajwaPic,
    },
    {
      name: 'Divya Niyyar',
      pronoun: '(she/her)',
      role: 'Coordinator',
      image: profilePic,
    },
    {
      name: 'Summit Niyar',
      pronoun: '(he/him)',
      role: 'Events & Volunteer Coordinator',
      image: profilePic,
    },
  ]

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
              imageUrl={profilePic}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamMember({ name, pronoun, role, imageUrl }: MemberProp) {
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
