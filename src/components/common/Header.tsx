import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-[#fdf4ed] px-6 md:px-16 py-2.5 flex items-center justify-between shadow-sm">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-3">
        <Image src="/sharpened_logo.png" alt="Hidden Treasure Logo" width={64} height={64} />
        <span className="text-[#0b2e42] text-2xl font-semibold tracking-wide font-Playfair antialiased drop-shadow-md">
          HIDDEN TREASURE
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-10 text-[#0b2e42] font-semibold text-xl antialiased drop-shadow-sm">
        <a href="#about" className="hover:underline uppercase tracking-wide">
          About Us
        </a>
        <a href="#blogs" className="hover:underline uppercase tracking-wide">
          Blogs
        </a>
        <a href="#events" className="hover:underline uppercase tracking-wide">
          Events
        </a>
        <button className="bg-[#13384E] text-white px-7 py-3 rounded-md text-lg font-semibold hover:bg-[#0a2638] transition">
          SIGN UP
        </button>
      </nav>
    </header>
  )
}
