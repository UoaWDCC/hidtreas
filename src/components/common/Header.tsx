import Image from 'next/image'
import LogoImage from '@/assets/logo.png'

export default function Header() {
  return (
    <header className="bg-[#FDF4ED] text-[#13384E]">
      <nav className="relative container mx-auto grid grid-cols-[1fr_auto_1fr]">
        <ul className="flex gap-8 items-center">
          <li>
            <a href="/about" className="font-extrabold">
              ABOUT US
            </a>
          </li>
          <li>
            <a href="#">BLOGS</a>
          </li>
          <li>
            <a href="#">EVENTS</a>
          </li>
        </ul>
        <div className="-translate-y-2  bg-white rounded-full">
          <Image src={LogoImage} alt="Logo" className="h-19  w-auto p-2.5" />
        </div>
        <ul className="flex gap-8 items-center place-content-end">
          <li>
            <a href="#">CONTACT US</a>
          </li>
          <li>
            <button className="bg-[#13384E] text-white rounded px-4 py-2 hover:cursor-pointer">
              SIGN UP
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
