import { IconX } from '@tabler/icons-react'
import Modal from '../common/Modal'
import Image from 'next/image'
import Logo from '@/assets/sharpened_logo.png'
import BirdPNG from '@/assets/signUpBird.png'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function PastEventsPopUpModal({
  signOpen,
  setSignOpen,
}: {
  signOpen: boolean
  setSignOpen: (open: boolean) => void
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
      </div>
    </Modal>
  )
}
