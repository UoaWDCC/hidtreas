import { IconX } from '@tabler/icons-react'
import Modal from './Modal'
import Image from 'next/image'
import Logo from '@/assets/sharpened_logo.png'
import { useRouter } from 'next/navigation'

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

  return (
    <Modal
      open={signOpen}
      onClose={() => setSignOpen(false)}
      className="w-xl h-[30rem] flex flex-row"
      noHeader
    >
      <div className="w-sm h-full bg-cyan-500 rounded-l-lg">Image</div>
      <div className="relative w-100 p-6 h-full flex flex-col items-center justify-center text-center">
        <IconX
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setSignOpen(false)}
        />
        <Image src={Logo} alt="Hidden Treasure Logo" width={50} height={50} />
        <h1 className="text-3xl font-[1000]">SIGN UP WITH US TODAY!</h1>
        <form>
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
              />
            )
          })}
          <input type="checkbox" name="agreeTnC" className="mt-5 mr-1 hover:cursor-pointer" />
          <label className="text-xs">
            I AGREE TO THE{' '}
            <a
              onClick={() => router.push('/TermsAndConditions')}
              className="underline hover:cursor-pointer"
            >
              TERMS AND CONDITIONS
            </a>
          </label>
          <button
            type="submit"
            className="bg-[#13384e] text-[#fdf4ed] rounded-md px-2 w-[15rem] h-[2rem] mt-5"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </Modal>
  )
}
