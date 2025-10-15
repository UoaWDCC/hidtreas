import { IconX } from '@tabler/icons-react'
import Modal from '../common/Modal'
import Image from 'next/image'
import Logo from '@/assets/sharpened_logo.png'
import BackgroundImage from '@/assets/otherKoru.png'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const fields = [
  { name: 'firstname', placeholder: 'FIRST NAME' },
  { name: 'lastname', placeholder: 'LAST NAME' },
  { name: 'email', placeholder: 'EMAIL ADDRESS' },
  {
    name: 'event',
    placeholder: 'SELECT EVENT',
    type: 'select',
    options: ['Event 1', 'Event 2', 'Event 3', 'Event 4'], // Placeholder
  },
]

export default function EventsSignUpModal({
  signOpen,
  setSignOpen,
  initialEmail = '',
  eventOptions = [],
}: {
  signOpen: boolean
  setSignOpen: (open: boolean) => void
  initialEmail?: string
  eventOptions?: string[]
}) {
  const router = useRouter()
  const [answers, setAnswers] = useState(false)

  return (
    <Modal
      open={signOpen}
      onClose={() => setSignOpen(false)}
      className="h-[30rem] bg-[#fdf4ed] flex flex-col w-[85vw] max-w-[28rem] sm:max-w-[30rem] md:max-w-[32rem] lg:max-w-[34rem] xl:w-xl"
      superClassName="bg-stone-200/75"
      noHeader
      doNotCloseOnClickOutside={answers}
    >
      <div className="relative h-full w-full bg-[#fdf4ed]">
        <Image
          src={BackgroundImage}
          alt="Background"
          fill
          className="object-cover object-center z-0 scale-x-[-1] rotate-180"
          style={{
            objectFit: 'contain', // Zooms out (shows full image)
            transform: 'scale(1)', // Optional: Further zoom out
            objectPosition: '200% center', // Shifts right (+20% offset)
          }}
        />
        <div className="relative z-10 p-5">
          <IconX
            className="absolute top-5 right-5 cursor-pointer z-20"
            onClick={() => setSignOpen(false)}
          />
          <div className="flex flex-col items-center">
            <Image src={Logo} alt="Hidden Treasure Logo" width={50} height={50} />
            <h1 className="text-3xl font-[1000] mt-4">EVENT SIGN-UP</h1>
          </div>
          <form
            onSubmit={(event) => {
              const form = event.target as HTMLFormElement
              if (!form.firstname.value.trim()) alert('Please enter a first name')
              else if (!form.lastname.value.trim()) alert('Please enter a last name')
              else if (!form.email.value.trim()) alert('Please enter an email')
              else if (form.event.value === 'SELECT EVENT') alert('Please select an event')
              else if (!form.agreeTnC.checked) alert('Agree to terms')
              else {
                alert('Success!')
                form.reset()
                setSignOpen(false)
              }
              event.preventDefault()
            }}
            className="mt-8"
          >
            <div className="flex justify-center gap-[5rem]">
              {fields.slice(0, 2).map((field) => (
                <input
                  key={field.name}
                  type="text"
                  className="block rounded-md px-2 w-[10rem] h-[3rem] bg-[#F0F0F0] border-2 text-m"
                  placeholder={field.placeholder}
                  name={field.name}
                  defaultValue={field.name === 'email' ? initialEmail : ''}
                  onChange={() => setAnswers(true)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <input
                key="email"
                type="text"
                className="rounded-md px-2 w-[25rem] h-[3rem] bg-[#F0F0F0] border-2 text-m"
                placeholder="EMAIL ADDRESS"
                name="email"
                defaultValue={initialEmail}
                onChange={() => setAnswers(true)}
              />
            </div>

            <div className="flex justify-center mt-8">
              <select
                name="event"
                className="rounded-md px-2 w-[25rem] h-[3rem] bg-[#F0F0F0] border-2 text-m"
                onChange={() => setAnswers(true)}
                defaultValue="SELECT EVENT"
              >
                <option value="SELECT EVENT" disabled>
                  SELECT EVENT
                </option>
                {eventOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center mt-4">
              <input type="checkbox" name="agreeTnC" className="mr-1 hover:cursor-pointer" />
              <label className="text-sm">
                I AGREE TO THE{' '}
                <a
                  onClick={() => {
                    router.push('/TermsAndConditions')
                    setAnswers(true)
                  }}
                  className="underline hover:cursor-pointer"
                >
                  TERMS AND CONDITIONS
                </a>
              </label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#13384e] text-[#fdf4ed] rounded-md px-2 w-[6rem] h-[3rem] mt-4 hover:bg-[#0a2638] transition"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}
