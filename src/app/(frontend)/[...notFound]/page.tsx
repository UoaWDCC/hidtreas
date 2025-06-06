import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import '../global.css'
import feather from '@/assets/big_feather.png'
import kiwi from '@/assets/kiwiBird.svg'
import blueKoru from '@/assets/blue_koru.png'
import koruAndLeaf from '@/assets/koruAndLeaf.png'
import blueWave from '@/assets/blue_wave.png'
import leaf from '@/assets/leaf.svg'
import Image from 'next/image'

const bgImages = [
  {
    key: 'bigFeather',
    src: feather,
    class: 'top-[10%] left-[25%]',
  },
  {
    key: 'koruAndLeaf',
    src: koruAndLeaf,
    class: 'top-[10%] right-[25%]',
  },
  {
    key: 'blueKoru',
    src: blueKoru,
    class: 'top-[50%] left-[10%]',
  },
  {
    key: 'leaf',
    src: leaf,
    class: 'top-[50%] right-[15%]',
  },
  {
    key: 'bigKiwi',
    src: kiwi,
    class: 'bottom-[10%] left-[25%]',
  },
  {
    key: 'blueWave',
    src: blueWave,
    class: 'bottom-[10%] right-[25%]',
  },
]

export default async function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* Entire 404 Page */}
      <div className="w-full h-full flex flex-col items-center justify-center text-center relative z-20">
        {/* Centerpiece with 404 message */}
        <div className="text-3xl font-black relative flex flex-col items-center justify-center">
          <div className="text-5xl font-[900] tracking-widest absolute -z-10 opacity-30">
            <h2 className="font-black text-[150px]">404</h2>
          </div>
          <h1>Oh No!</h1>
          <h1>This Treasure Does Not Exist.</h1>
        </div>

        {/* Links out of page */}
        <div className="underline font-semibold text-sm mt-5 flex flex-col gap-4 justify-center mt-20 uppercase tracking-wider">
          <a href="/">Return to Home</a>
          <a href="/events">Explore our Stories and Events</a>
        </div>

        {/* All the extras in the background */}
        <div className="absolute w-full h-full opacity-70 hidden md:block -z-10">
          {bgImages?.map((img) => (
            <Image
              key={img.key}
              src={img.src}
              alt=""
              className={`absolute ${img.class}`}
              height={50}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
