import Image from 'next/image'
import LogoImage from '@/assets/logo.png'

export default function Header() {
  return (
    <header className="bg-[#FDF4ED] text-[#13384E]">
      <nav className="relative container mx-auto flex items-center justify-between py-6">
        <ul className="flex space-x-8 items-center">
          <li>
            <a href="" className="font-extrabold">
              ABOUT US
            </a>
          </li>
          <li>
            <a href="">BLOGS</a>
          </li>
          <li>
            <a href="">EVENTS</a>
          </li>
        </ul>
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-3  bg-white rounded-full">
          <Image src={LogoImage} alt="Logo" className="h-19 w-auto m-2.5" />
        </div>
        <ul className="flex space-x-8 items-center">
          <li>
            <a href="">CONTACT US</a>
          </li>
          <li>
            <button className="bg-[#13384E] text-white rounded px-4 py-2">SIGN UP</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
