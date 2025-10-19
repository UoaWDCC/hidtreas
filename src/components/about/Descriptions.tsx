import Image from 'next/image'
import logo from '@/assets/sharpened_logo.png'
import blueKoru from '@/assets/blue_koru.png'
import { AboutPageImage } from '@/payload-types'
import { getPayloadImageUrl } from '@/utils/image'

interface DescriptionImageProps {
  descriptionImage1: AboutPageImage[]
  descriptionImage2: AboutPageImage[]
}

export default function Descriptions({
  descriptionImage1,
  descriptionImage2,
}: DescriptionImageProps) {
  // Fixed: Added optional chaining to prevent crashes if arrays are empty
  const image = descriptionImage1?.[0]?.image
  const rightimageUrl = getPayloadImageUrl(image) ?? ''

  const image2 = descriptionImage2?.[0]?.image
  const leftimageUrl = getPayloadImageUrl(image2) ?? ''

  // Log errors if images not found
  if (!rightimageUrl) {
    console.error('Description image 1 not loaded from Payload CMS')
  }
  if (!leftimageUrl) {
    console.error('Description image 2 not loaded from Payload CMS')
  }

  return (
    <section className="relative pb-[3rem] md:pb-[4.5rem] pt-[0.5rem] md:pt-[1rem]">
      {/* Blue koru decoration between hero and description */}
      <Image
        src={blueKoru}
        alt="Blue Koru"
        className="absolute right-0 top-[-3rem] w-20 rotate-270 z-10 sm:hidden"
        quality={80}
      />

      {/* Blue koru decoration on left side - flipped 180 degrees */}
      <Image
        src={blueKoru}
        alt="Blue Koru"
        className="absolute left-0 top-[-3rem] sm:top-[-4rem] w-20 sm:w-35 z-10"
        style={{ transform: 'rotate(90deg) scaleX(-1)' }}
        quality={80}
      />

      <div className="md:mb-[12rem]">
        {/* Descriptions Section */}
        <div className="relative w-full h-full  flex flex-col items-center px-4">
          {/* logo */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-[20vw] sm:w-[15vw] md:w-[10vw] mb-[3vh]">
              <Image
                src={logo}
                alt="Hidden Treasure logo"
                className="object-contain"
                quality={90}
              />
            </div>
          </div>

          {/* Descriptive text */}
          <div className="relative w-[90%] sm:w-[75%] md:w-[60%] text-center px-2 sm:px-0">
            <p className="mt-4 text-[0.95rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.6rem] font-normal text-center leading-relaxed">
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

            {/* Small top right frame - hidden on mobile */}
            <div
              className="absolute
                hidden
                sm:block
                sm:-top-[9rem]
                md:-top-[12rem]
                lg:-top-[14rem]
                xl:-top-[17rem]
                sm:-right-[10vw]
                md:-right-[15vw]
                w-[14vw]
                aspect-square"
            >
              <div className="relative w-full h-full">
                <Image
                  src={rightimageUrl}
                  alt="Flag Bearer"
                  fill
                  className="object-cover rounded-lg border-4 border-[#13384E] shadow-xl ring-1 ring-[#13384E]/20"
                  sizes="14vw"
                  quality={75}
                />
              </div>{' '}
            </div>

            {/* Small bottom left image - hidden on mobile */}
            <div
              className="absolute
                hidden
                sm:block
                sm:-bottom-[10vh]
                md:-bottom-[14vh]
                lg:-bottom-[21vh]
                xl:-bottom-[27vh]
                sm:-left-[10vw]
                md:-left-[15vw]
                w-[14vw]
                aspect-square"
            >
              <div className="relative w-full h-full">
                <Image
                  src={leftimageUrl}
                  alt="People sitting on steps wearing traditional Indian clothing."
                  fill
                  className="object-cover rounded-lg border-4 border-[#13384E] shadow-xl ring-1 ring-[#13384E]/20"
                  sizes="14vw"
                  quality={75}
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
