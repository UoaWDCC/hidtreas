import Image from 'next/image'
import placeholder from '@/assets/image_placeholder.png'
import logo from '@/assets/sharpened_logo.png'

export default function Descriptions() {
  return (
    <div>
    {/* Descriptions Section */}
      {/* Small top right image */}
      <div className="relative w-full h-full pb-64 pt-[10vw]">
        <div className="relative w-full flex justify-end">
          <div className="absolute -top-[5vh] right-10 w-[18vw] aspect-square">
            <Image 
            src={placeholder} 
            alt="Small image" 
            className="object-contain" 
            />
          </div>
        </div>


        <div className="flex flex-col items-center justify-center px-4">
          {/* logo */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-[10vw]">
              <Image 
              src={logo} 
              alt="Hidden Treasure logo" 
              className="object-contain" 
              />
            </div>
          </div>


          {/* Descriptive text */}
          <div className="w-[45vw]">
            <p className="mt-4 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.6rem] font-normal text-center">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
              quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
              Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo
              eu aenean.
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
              quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
              Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo
              eu aenean.

            </p>
          </div>
        </div>

        {/* Small bottom left image */}
        <div className="relative w-full flex justify">
          <div className="absolute -bottom-[10vh] left-10 w-[18vw] aspect-square">
            <Image 
            src={placeholder} 
            alt="Small image" 
            className="object-contain" 
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[5vw]" />
      </div>
    </div>
  )
}
