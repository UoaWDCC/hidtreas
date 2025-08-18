import { IconX } from '@tabler/icons-react'
import Modal from '../common/Modal'
import Image from 'next/image'
import blurWave from '@/assets/blur_blue_wave.png'
import placeholder1 from '@/assets/landscape_placeholder.png' // Placeholder image if needed
import placeholder2 from '@/assets/placeholder.jpg' // Placeholder image if needed
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
  const images = [placeholder1, placeholder2, placeholder1]
  const [currentIdx, setCurrentIdx] = useState(0)
  const goPrev = () => setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const goNext = () => setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  return (
    <Modal
      open={signOpen}
      onClose={() => {
        setSignOpen(false)
      }}
      className="w-sm h-[40rem] bg-[#fdf4ed] flex flex-col md:w-md lg:w-lg xl:w-xl"
      superClassName="bg-stone-200/75"
      noHeader
      doNotCloseOnClickOutside={answers}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={blurWave}
          alt="Blurred Wave"
          fill
          className="object-cover w-full h-full"
          //style={{ filter: 'blur(30px)' }}
        />
        <div className="absolute top-10">
          <p className="text-lg text-black font-bold" style={{ fontFamily: 'var(--font-header)' }}>
            Super Duper Interesting Event
          </p>
        </div>
        <div className="absolute top-17">
          <p className="text-xs text-black font-bold" style={{ fontFamily: 'var(--font-header)' }}>
            23/06/2025
          </p>
        </div>
        <div className="max-w-7xl relative rounded-3xl overflow-hidden z-20 pb-15 pt-20">
          <div className="flex items-center justify-center space-x-4">
            <button onClick={goPrev} className="px-2 py-1 hover:cursor-pointer">
              {'<'}
            </button>
            <div className="relative w-60 h-46 rounded-xl overflow-hidden shadow-md md:w-70 md:h-56 lg:w-80 lg:h-60 xl:w-90 xl:h-66">
              <Image
                src={images[currentIdx]}
                alt={`Image ${currentIdx + 1}`}
                className="w-full h-full object-cover"
                width={320}
                height={224}
              />
            </div>
            <button onClick={goNext} className="px-2 py-1 cursor-pointer">
              {'>'}
            </button>
          </div>
        </div>
        <div className="w-[20rem] md:w-[25rem] lg:w-[30rem] z-10 pb-10">
          <p
            className="text-xs text-black font-normal text-center"
            style={{ fontFamily: 'var(--font-header)' }}
          >
            words of wisdom orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          </p>
        </div>
        <button className="text-xs font-normal text-white rounded-md bg-[#13384E] py-3 px-3 hover:bg-[#184763] cursor-pointer z-10"
        style={{ fontFamily: 'var(--font-header)' }}> 
          Notify me next time
        </button>
        <div className="absolute top-5 right-5 z-10">
          <IconX className="cursor-pointer" onClick={() => setSignOpen(false)} />
        </div>
      </div>
    </Modal>
  )
}
