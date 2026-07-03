import { IconX } from '@tabler/icons-react'
import Modal from '../common/Modal'
import Image from 'next/image'
import Logo from '@/assets/logo.webp'
import BackgroundImage from '@/assets/other-koru.png'
import { useState } from 'react'
import { createEventSubscriberAction } from '@/lib/payload/actions'

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
  eventOptions?: { title: string; id: string }[]
  eventToSignUp?: { title: string; id: string } | null
}) {
  const [answers, setAnswers] = useState(false)
  const [errors, setErrors] = useState(emptyErrors)
  const [successful, setSuccessful] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  return (
    <Modal
      open={signOpen}
      onClose={() => {
        setSuccessful(false)
        setErrors(emptyErrors)
        setSignOpen(false)
      }}
      className="h-[30rem] bg-background flex flex-col w-[85vw] max-w-[28rem] sm:max-w-[30rem] md:max-w-[32rem] lg:max-w-[34rem] xl:w-xl"
      superClassName="bg-stone-200/75"
      noHeader
      doNotCloseOnClickOutside={answers}
    >
      <div className="relative h-full w-full bg-background">
        {successful ? (
          <div className="relative p-6 h-full w-full flex flex-col items-center justify-center text-center">
            <IconX
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => {
                setSuccessful(false)
                setSignOpen(false)
              }}
            />
            <Image src={Logo} alt="Hidden Treasure Logo" width={100} height={100} />
            <h1 className="text-6xl font-[1000] mt-10">THANK YOU FOR SIGNING UP!</h1>
            <p className="mt-5">We can&apos;t wait to share our updates with you.</p>
          </div>
        ) : (
          <>
            <Image
              src={BackgroundImage}
              alt="Background"
              fill
              sizes="(max-width: 768px) 85vw, 34rem"
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
                  if (submitting || !checkValid(form, setErrors)) return
                  if (!eventToSignUp && form.event.value === 'SELECT EVENT') {
                    setErrors((prev) => {
                      const newErrors = [...prev]
                      newErrors[3] = true
                      return newErrors
                    })
                    return
                  }
                  setSubmitting(true)
                  createEventSubscriberAction({
                    eventId: eventToSignUp ? eventToSignUp.id : form.event.value,
                    email: form.email.value.trim(),
                    firstName: form.firstname.value.trim(),
                    lastName: form.lastname.value.trim(),
                    agreed: form.agreeTnC.checked,
                    company: (form.company as HTMLInputElement)?.value ?? '',
                  })
                    .then((result) => {
                      // Duplicate = already registered for this event -> success.
                      if (result.success || result.code === 'DUPLICATE') {
                        setSuccessful(true)
                        setAnswers(false)
                        form.reset()
                      } else {
                        alert('Error subscribing. Please try again later.')
                      }
                    })
                    .catch(() => alert('Error subscribing. Please try again later.'))
                    .finally(() => setSubmitting(false))
                }}
                className="mt-8"
              >
                {/* Honeypot: hidden from users; bots that fill it are silently dropped */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="flex justify-center gap-[5rem]">
                  {fields.slice(0, 2).map((field, index) => (
                    <input
                      key={field.name}
                      type="text"
                      className="block rounded-md px-2 w-[10rem] h-[3rem] bg-input-bg border-2 text-m"
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
                    className="rounded-md px-2 w-[25rem] h-[3rem] bg-input-bg border-2 text-m"
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
                    // Show truncated event title (max 30 chars) when preselected
                    <p className="text-2xl font-semibold">
                      {eventToSignUp.title.length > 30
                        ? eventToSignUp.title.slice(0, 30) + '...'
                        : eventToSignUp.title}
                    </p>
                  ) : (
                    <select
                      name="event"
                      className="rounded-md px-2 w-[25rem] h-[3rem] bg-input-bg border-2 text-m"
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
                        <option key={option.id} value={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="flex justify-center mt-4">
                  <input type="checkbox" name="agreeTnC" className="mr-1 hover:cursor-pointer" />
                  <label className="text-sm" style={{ color: errors[4] ? 'red' : 'black' }}>
                    I AGREE TO THE{' '}
                    {/* TODO: Add Terms and Conditions page */}
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="underline hover:cursor-pointer"
                    >
                      TERMS AND CONDITIONS
                    </a>
                  </label>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary text-background rounded-md px-2 w-[6rem] h-[3rem] mt-4 hover:bg-primary-hover transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? '...' : 'SIGN UP'}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

function checkValid(form: HTMLFormElement, setErrors: (errors: boolean[]) => void) {
  let valid = true
  const errors = [...emptyErrors]
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
