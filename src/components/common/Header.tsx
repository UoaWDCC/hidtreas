import Image from 'next/image'
import image from '@/assets/logo.png'

export default function Header() {
  return (
    <header className="flex flex-col bg-[#fdf4ed] text-[#13384e]">
      <div className="flex justify-between items-center py-4 px-27">
        {/* Left: Empty Space */}
        <div className="flex-1"></div>

        {/* Left: Logo and Name */}
        <div className="grid grid-cols-3 items-center cursor-pointer">
          <h1 className="text-2xl font-inter font-semibold text-right">HIDDEN</h1>
          <div className="flex justify-center items-center">
            <Image src={image} height={60} width={60} alt="Logo"/>
          </div>
          <h1 className="text-2xl font-inter font-semibold text-left">TREASURE</h1>
        </div>

        {/* Right: Sign Up Button */}
        <div className="flex flex-1 justify-end items-center">
          <button className="w-30 bg-[#13384e] text-white px-5 py-2 rounded-md hover:bg-[#162c3b] cursor-pointer transition">
            SIGN UP
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex justify-center pb-4 px-25">
        <nav className="flex-10 border-y border-gray-400">
          <ul className="flex justify-between py-2 text-sm font-medium">
            <li className="pl-20 hover:underline cursor-pointer">HOME</li>
            <li className="hover:underline cursor-pointer">ABOUT US</li>
            <li className="hover:underline cursor-pointer">BLOGS</li>
            <li className="hover:underline cursor-pointer">EVENTS</li>
            <li className="hover:underline cursor-pointer">OUR VALUES</li>
            <li className="pr-20 hover:underline cursor-pointer">CONTACT US</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
