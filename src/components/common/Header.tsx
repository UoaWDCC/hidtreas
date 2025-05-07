import logo from '/public/logo.png'
import Image from 'next/image'

export default function Header() {

  return (
    <div className="flex flex-col items-center"> 
      <div className="flex justify-center pt-4"> 
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Hidden Treasure Logo"
            width={30}
            height={30}
          />
          <h1>HIDDEN TREASURE</h1>
        </div>
      </div>

      <nav>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl w-full px-4 py-3">
            <p>HOME</p>
            <p>ABOUT US</p>
            <p>BLOGS</p>
            <p>EVENTS</p>
            <p>OUR VALUES</p>
            <p>CONTACT US</p>
          </div>
        </div>
      </nav>
    </div>  
  )
}
