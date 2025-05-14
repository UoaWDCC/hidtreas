import Image from 'next/image'
import nasz from '@/assets/sharpened_logo.png'

export default function Header() {
  return (
    <header className="px-6 md:px-16 py-[0.6rem] flex items-center justify-between">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-3">
        <Image src={nasz} alt="Hidden Treasure Logo" width={64} height={64} />
        <h1 className="text-[1.35rem] font-semibold tracking-wide antialiased">HIDDEN TREASURE</h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-10 font-medium text-lg antialiased">
        <h1>
          <a href="#about" className="hover:underline uppercase tracking-wide">
            About Us
          </a>
        </h1>
        <h1>
          <a href="#blogs" className="hover:underline uppercase tracking-wide">
            Blogs
          </a>
        </h1>
        <h1>
          <a href="#events" className="hover:underline uppercase tracking-wide">
            Events
          </a>
        </h1>
        <h1>
          <button className="bg-[#13384E] text-white px-7 py-3 rounded-md text-lg font-medium hover:bg-[#0a2638] transition">
            SIGN UP
          </button>
        </h1>
      </nav>
    </header>
  )
}
