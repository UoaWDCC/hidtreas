import { IconX } from '@tabler/icons-react'
import Modal from '../common/Modal'
import Image from 'next/image'
import Logo from '@/assets/sharpened_logo.png'
import BackgroundImage from '@/assets/otherKoru.png'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createEventSubscriber } from '@/lib/payload/eventSubscribers'

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

const emptyErrors = new Array(fields.length + 1).fill(false) as boolean[]

export default function EventsSignUpModal({
  signOpen,
  setSignOpen,
  initialEmail = '',
  eventOptions = [],
  eventToSignUp = null,
}: {
  signOpen: boolean
  setSignOpen: (open: boolean) => void
  initialEmail?: string
  eventOptions?: string[]
  eventToSignUp?: { title: string; id: string } | null
}) {
  const router = useRouter()
  const [answers, setAnswers] = useState(false)
  const [errors, setErrors] = useState(emptyErrors)
  const [successful, setSuccessful] = useState(false)

  return (
    <Modal
      open={signOpen}
      onClose={() => {
        setSuccessful(false)
        setErrors(emptyErrors)
        setSignOpen(false)
      }}
      className="w-sm h-[30rem] bg-[#fdf4ed] flex flex-col xl:w-xl"
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
            onClick={() => {
              setSuccessful(false)
              setErrors(emptyErrors)
              setSignOpen(false)
            }}
          />
          <div className="flex flex-col items-center">
            <Image src={Logo} alt="Hidden Treasure Logo" width={50} height={50} />
            <h1 className="text-3xl font-[1000] mt-4">EVENT SIGN-UP</h1>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const form = event.target as HTMLFormElement
              if (!checkValid(form, setErrors)) return
              if (!eventToSignUp && form.event.value === 'SELECT EVENT') {
                setErrors((prev) => {
                  const newErrors = [...prev]
                  newErrors[3] = true
                  return newErrors
                })
                return
              }
              createEventSubscriber(
                eventToSignUp ? eventToSignUp.id : form.event.value.id,
                form.email.value.trim(),
                form.firstname.value.trim(),
                form.lastname.value.trim(),
              )
                .then(() => {
                  setSuccessful(true)
                  setAnswers(false)
                  form.reset()
                })
                .catch((e) => {
                  if (e.message.includes('Value must be unique')) {
                    setSuccessful(true)
                  } else {
                    alert('Error subscribing. Please try again later.')
                  }
                })
            }}
            className="mt-8"
          >
            <div className="flex justify-center gap-[5rem]">
              {fields.slice(0, 2).map((field, index) => (
                <input
                  key={field.name}
                  type="text"
                  className="block rounded-md px-2 w-[10rem] h-[3rem] bg-[#F0F0F0] border-2 text-m"
                  placeholder={field.placeholder}
                  name={field.name}
                  defaultValue={field.name === 'email' ? initialEmail : ''}
                  onChange={() => setAnswers(true)}
                  style={{
                    borderColor: errors[index] ? 'red' : 'black',
                  }}
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
                style={{
                  borderColor: errors[2] ? 'red' : 'black',
                }}
              />
            </div>

            <div className="flex justify-center mt-8">
              {eventToSignUp ? (
                // If event is preselected, show title instead of dropdown
                // Only show the first 30 characters of the title
                // (to avoid overflow)
                <p className="text-2xl font-semibold">
                  {eventToSignUp.title.length > 30
                    ? eventToSignUp.title.slice(0, 30) + '...'
                    : eventToSignUp.title}
                </p>
              ) : (
                <select
                  name="event"
                  className="rounded-md px-2 w-[25rem] h-[3rem] bg-[#F0F0F0] border-2 text-m"
                  onChange={() => setAnswers(true)}
                  defaultValue="SELECT EVENT"
                  style={{
                    borderColor: errors[3] ? 'red' : 'black',
                  }}
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
              )}
            </div>
            <div className="flex justify-center mt-4">
              <input type="checkbox" name="agreeTnC" className="mr-1 hover:cursor-pointer" />
              <label className="text-sm" style={{ color: errors[4] ? 'red' : 'black' }}>
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

function checkValid(form: HTMLFormElement, setErrors: (errors: boolean[]) => void) {
  let valid = true
  let errors = [...emptyErrors]
  if (form.firstname.value.trim().length <= 0) {
    errors[0] = true
    valid = false
  }
  if (form.lastname.value.trim().length <= 0) {
    errors[1] = true
    valid = false
  }
  if (form.email.value.trim().length <= 0) {
    errors[2] = true
    valid = false
  }
  if (!form.agreeTnC.checked) {
    errors[4] = true
    valid = false
  }
  setErrors(errors)
  return valid
}
