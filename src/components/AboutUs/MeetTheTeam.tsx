import Image, { StaticImageData } from 'next/image'
import profilePic from '@/assets/personPicture.png'
import koru from '@/assets/bigGreenKoru.png'
import kiwi from '@/assets/kiwiBird.svg'

export default function MeetTheTeam() {
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
      image: profilePic,
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
      image: profilePic,
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

  return (
    <div className="relative mb-[6rem] md:mb-[8rem]">
      {/* whole section */}

      {/*background koru - positioned between sections*/}
      <Image
        src={koru}
        alt="Koru"
        className="absolute left-[-2%] bottom-[-5rem] -translate-x-0 w-[35vw] h-auto rotate-90 z-[-10]"
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
          {peopleArray.map((person) => (
            <TeamMember
              key={person.name}
              name={person.name}
              pronoun={person.pronoun}
              role={person.role}
              image={person.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamMember({
  name,
  pronoun,
  role,
  image,
}: {
  name: string
  pronoun: string
  role: string
  image: StaticImageData
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* image */}

      <Image src={image} alt={`${name}'s photo`} className="w-[clamp(4rem,20vw,10rem)] h-auto" />

      {/* text stuff */}
      <p className="text-[clamp(1rem,4vw,2rem)]">{name}</p>
      <p className="text-[clamp(0.5rem,2vw,1rem)]">{pronoun}</p>
      <p className="text-[clamp(0.8rem,2.5vw,1.6rem)]">{role}</p>
    </div>
  )
}
