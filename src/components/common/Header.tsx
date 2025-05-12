import logo from '/src/public/logo.png'
import Image from 'next/image'

export default function Header() {

  return (
    <div className="flex flex-col items-center"> 
      <div className="flex justify-center pt-4"> 
        <div className="flex items-center gap-4">
          <Image src={logo} alt="Hidden Treasure Logo"
            width={40}
            height={40}
          />
          <p className="text-lg font-medium">HIDDEN TREASURE</p>
          <button className="font-light absolute right-10 bg-[#13384E] text-white py-2 px-8 rounded transition-colors">
          SIGN UP
        </button>
        </div>
      </div>

      <nav>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-4 py-3">
            <a href="#">
            <p className="hover:[text-shadow:0_0_0.5px_currentColor]">HOME</p></a>
            <div className="inline-block h-[25px] w-0.5 bg-[#13384E]/40"></div>
            
            <a href="/aboutus">
            <p className="hover:[text-shadow:0_0_0.5px_currentColor]">ABOUT US</p></a>
            <div className="inline-block h-[25px] w-0.5 bg-[#13384E]/40"></div>

            <a href="#blogs">
            <p className="hover:[text-shadow:0_0_0.5px_currentColor]">BLOGS</p></a>
            <div className="inline-block h-[25px] w-0.5 bg-[#13384E]/40"></div>

            <a href="/events" className="hover:[text-shadow:0_0_0.5px_currentColor]">
            <p className="hover:[text-shadow:0_0_0.5px_currentColor]">EVENTS</p></a>
            <div className="inline-block h-[25px] w-0.5 bg-[#13384E]/40"></div>

            <a href="/ourvalues">
            <p className="hover:[text-shadow:0_0_0.5px_currentColor]">OUR VALUES</p></a>
            <div className="inline-block h-[25px] w-0.5 bg-[#13384E]/40"></div>

            <a href="/contactus">
            <p className="hover:[text-shadow:0_0_0.5px_currentColor]">CONTACT US</p></a>
          </div>
        </div>
      </nav>
    </div>  
  )
}
