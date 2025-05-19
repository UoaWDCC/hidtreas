import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Image from 'next/image'
import peoplePlaceholder from '@/assets/people_placeholder.png'
import placeholder from '@/assets/image_placeholder.png'
import logo from '@/assets/sharpened_logo.png'

export default async function AboutPage() {
  return (
    <div className="home">
      <Header />
    {/* Hero */}
      <div className="relative flex justify-center">
        <div className="w-full relative">
          {/* Image */}
          <Image
            src={peoplePlaceholder}
            alt="Hidden Treasure People" // Actual image should be shorter than placeholder
            className="object-contain w-[50vw] h-[auto]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-[1.875rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[5.2rem] font-extrabold leading-tight tracking-wide mt-[0.125rem] -translate-y-8">
              ABOUT US
            </h1>
            {/* Descriptive text */}
            <div className="w-[50vw]">
              <p className="mt-4 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.6rem] font-normal text-center">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
                quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
                Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus
                leo eu aenean.
              </p>
            </div>
          </div>
        </div>
      </div>

    {/* Descriptions Section */}
      {/* Small top right image */}
      <div className="relative">
        <div className="relative pt-64 w-full flex justify-end px-15">
          <div className="relative w-[20vw] aspect-square">
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
          <div className="w-[50vw]">
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
        <div className="relative pt-32 pb-64 w-full flex justify px-15">
          <div className="relative w-[20vw] aspect-square">
            <Image 
            src={placeholder} 
            alt="Small image" 
            className="object-contain" 
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
