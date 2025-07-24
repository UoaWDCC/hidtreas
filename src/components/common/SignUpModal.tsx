import { IconX } from '@tabler/icons-react'
import Modal from './Modal'
import Image from 'next/image'
import Logo from '@/assets/sharpened_logo.png'
import BirdPNG from '@/assets/signUpBird.png'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const fields = [
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

  return (
    <Modal
      open={signOpen}
      onClose={() => {
        setSignOpen(false)
      }}
      className="w-sm h-[30rem] flex flex-row xl:w-xl"
      superClassName="bg-stone-200/75"
      noHeader
      doNotCloseOnClickOutside={answers}
    >
      <div className="w-sm h-full bg-cyan-500 rounded-l-lg hidden xl:block">
        <Image src={BirdPNG} alt="Hidden Treasure Logo" className="w-sm h-full rounded-l-lg" />
      </div>
      <div className="relative w-sm p-6 h-full flex flex-col items-center justify-center text-center">
        <IconX
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setSignOpen(false)}
        />
        <Image src={Logo} alt="Hidden Treasure Logo" width={50} height={50} />
        <h1 className="text-3xl font-[1000]">SIGN UP WITH US TODAY!</h1>
        <form
          onSubmit={(event) => {
            const form = event.target as HTMLFormElement
            if (form.firstname.value.trim().length <= 0) {
              alert('Please enter a valid first name')
            } else if (form.lastname.value.trim().length <= 0) {
              alert('Please enter a valid last name')
            } else if (form.email.value.trim().length <= 0) {
              alert('Please enter a valid email address')
            } else if (!form.agreeTnC.checked) {
              alert('Please agree to the terms and conditions')
            } else {
              alert('Form submitted successfully!')
              form.reset()
              setSignOpen(false)
              return
            }
            event.preventDefault()
          }}
        >
          {fields.map((field) => {
            const defaultValue = field.name === 'email' ? initialEmail : ''
            return (
              <input
                key={field.name}
                type="text"
                className="rounded-md px-2 w-[15rem] h-[2rem] bg-stone-300 mt-5"
                placeholder={field.placeholder}
                name={field.name}
                defaultValue={defaultValue}
                onChange={() => setAnswers(true)}
              />
            )
          })}
          <div>
            <input type="checkbox" name="agreeTnC" className="mt-5 mr-1 hover:cursor-pointer" />
            <label className="text-xs">
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
          <button
            type="submit"
            className="bg-[#13384e] text-[#fdf4ed] rounded-md px-2 w-[15rem] h-[2rem] mt-5 hover:cursor-pointer hover:bg-[#0a2638] transition"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </Modal>
  )
}
