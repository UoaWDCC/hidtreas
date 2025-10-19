import { IconX } from '@tabler/icons-react'
import Modal from './Modal'
import Image from 'next/image'
import Logo from '@/assets/sharpened_logo.webp' // Changed from .png to .webp for 90% smaller file
import BirdPNG from '@/assets/signUpBird.png'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createSubscriber } from '@/lib/payload/subscribers'

const fields: { name: string; placeholder: string }[] = [
  {
    name: 'firstname',
    placeholder: 'FIRST NAME',
  },
  {
    name: 'lastname',
    placeholder: 'LAST NAME',
  },
  {
    name: 'email',
    placeholder: 'EMAIL ADDRESS',
  },
]
const emptyErrors = new Array(fields.length + 1).fill(false) as boolean[]

export default function SignUpModal({
  signOpen,
  setSignOpen,
  initialEmail = '',
}: {
  signOpen: boolean
  setSignOpen: (open: boolean) => void
  initialEmail?: string
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
      className="relative w-full sm:w-auto max-w-[calc(100vw-3rem)] sm:max-w-[24rem] md:max-w-[30rem] lg:max-w-[34rem] xl:max-w-[36rem] 2xl:max-w-[38rem] max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col xl:flex-row xl:w-[36rem]"
      superClassName="bg-stone-200/75"
      noHeader
      doNotCloseOnClickOutside={answers}
    >
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
          <p className="mt-5">We can't wait to share our updates with you.</p>
        </div>
      ) : (
        <>
          <IconX
            aria-label="Close sign up modal"
            className="absolute top-3 right-3 z-30 h-7 w-7 cursor-pointer text-[#13384e] transition hover:text-[#0a2638]"
            onClick={() => setSignOpen(false)}
          />
          <div className="hidden xl:block xl:w-[16rem] h-full bg-cyan-500 rounded-l-lg">
            <Image
              src={BirdPNG}
              alt="Hidden Treasure Logo"
              className="w-full h-full rounded-l-lg object-cover"
            />
          </div>
          <div className="relative flex-1 w-full p-6 h-full flex flex-col items-center justify-center text-center overflow-y-auto pt-8">
            <Image src={Logo} alt="Hidden Treasure Logo" width={50} height={50} />
            <h1 className="text-3xl font-[1000]">SIGN UP WITH US TODAY!</h1>
            <form
              onSubmit={(event) => {
                const form = event.target as HTMLFormElement
                if (checkValid(form, setErrors)) {
                  createSubscriber(
                    form.firstname.value.trim(),
                    form.lastname.value.trim(),
                    form.email.value.trim(),
                  )
                    .then(() => {
                      form.reset()
                      setSuccessful(true)
                    })
                    .catch((e) => {
                      if (e.message.includes('Value must be unique')) {
                        setSuccessful(true)
                      } else {
                        alert('Error subscribing. Please try again later.')
                      }
                    })
                }
                event.preventDefault()
              }}
            >
              {fields.map((field, index) => {
                const defaultValue = field.name === 'email' ? initialEmail : ''
                return (
                  <div key={field.name}>
                    <input
                      type="text"
                      className="rounded-md px-2 w-[15rem] h-[2rem] bg-stone-300 mt-5"
                      placeholder={field.placeholder}
                      name={field.name}
                      defaultValue={defaultValue}
                      onChange={() => setAnswers(true)}
                      style={{
                        borderColor: errors[index] ? 'red' : 'black',
                        borderWidth: errors[index] ? 1 : 0,
                      }}
                    />
                  </div>
                )
              })}
              <div>
                <input
                  type="checkbox"
                  name="agreeTnC"
                  className="mt-5 mr-1 hover:cursor-pointer"
                  onChange={() => setAnswers(true)}
                />
                <label
                  className="text-xs"
                  style={{
                    color: errors[fields.length] ? 'red' : 'black',
                  }}
                >
                  I AGREE TO THE{' '}
                  <a
                    onClick={() => {
                      router.push('/TermsAndConditions')
                    }}
                    className="underline hover:cursor-pointer"
                  >
                    TERMS AND CONDITIONS
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-[#13384e] text-[#fdf4ed] rounded-md px-2 w-[15rem] h-[2rem] mt-5 hover:cursor-pointer hover:bg-[#0a2638] transition"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </>
      )}
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
    errors[3] = true
    valid = false
  }
  setErrors(errors)
  return valid
}
