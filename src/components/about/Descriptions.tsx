import Image from 'next/image'
import leftImage from '@/assets/peopleOnSteps.jpg'
import rightImage from '@/assets/flagBearer.png'
import logo from '@/assets/sharpened_logo.png'

export default function Descriptions() {
  return (
    <section className="relative pb-[12rem]">
      <div className="md:mb-[12rem]">
        {/* Descriptions Section */}
        <div className="relative w-full h-full  flex flex-col items-center px-4">
          {/* logo */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-[10vw] mb-[3vh]">
              <Image src={logo} alt="Hidden Treasure logo" className="object-contain" />
            </div>
          </div>

          {/* Descriptive text */}
          <div className="relative w-[90%] sm:w-[75%] md:w-[60%] text-center">
            <p className="mt-4 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.6rem] font-normal text-center">
              Hidden Treasure Trust was established to unite communities by honouring the wisdom of
              our elders and empowering the next generation. Our mission is to serve, support, and
              connect people through practical initiatives and inclusive engagement.
              <br />
              <br />
              Founded by community members who possess unique perspectives on life, the Trust is
              rooted in empathy and a dedication to creating lasting, meaningful change. From free
              radio programmes to food support, we combine modern tools with traditional wisdom to
              serve our diverse and growing community.
            </p>

            {/* Small top right frame */}
            <div
              className="absolute 
                -top-[20vh] 
                sm:-top-[25vh] 
                md:-top-[35vh] 
                lg:-top-[45vh] 
                xl:-top-[65vh]
                right-[3vw] 
                sm:-right-[10vw] 
                md:-right-[15vw]
                w-[25vw] 
                aspect-square"
            >
              <div className="relative w-full h-full">
                <Image src={rightImage} alt="Flag Bearer" fill className="object-contain" />
              </div>{' '}
            </div>

            {/* Small bottom left image */}
            <div
              className="absolute 
                -bottom-[17vh] 
                sm:-bottom-[20vh] 
                md:-bottom-[25vh] 
                lg:-bottom-[35vh] 
                xl:-bottom-[45vh] 
                left-[3vw] 
                sm:-left-[10vw] 
                md:-left-[15vw]
                w-[20vw] 
                aspect-square"
            >
              <div className="relative w-full h-full">
                <Image
                  src={leftImage}
                  alt="People sitting on steps wearing traditional Indian clothing."
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div />
      </div>
    </section>
  )
}
