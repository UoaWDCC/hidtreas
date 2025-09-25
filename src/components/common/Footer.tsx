'use client'
import {
  IconPhoneFilled,
  IconMailFilled,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandYoutube,
  IconArrowRight,
  IconX,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import footerLogoSharpened from '@/assets/footer-logo-sharpened.png'
import Modal from './Modal'
import SignUpModal from './SignUpModal'
import NotFound from '@/app/(frontend)/[...notFound]/page'

// TODO: Make sure that the links are correct
const links: {
  label: string
  items: { label: string; href: string | undefined; icon: any }[]
  extlinks: { href: string; icon: any }[] | undefined
}[] = [
  {
    label: 'QUICK LINKS',
    items: [
      // currenly linked events and blogs to 404 not found
      { label: 'Home', href: '/', icon: undefined },
      { label: 'About Us', href: '/about', icon: undefined },
      { label: 'Events', href: '/NotFound', icon: undefined },
      { label: 'Blogs', href: '/NotFound', icon: undefined },
      { label: 'FAQ', href: '/faq', icon: undefined },
      //{ label: 'Our Values', href: '/values', icon: undefined },
      //{ label: 'Contact Us', href: '/contact', icon: undefined },
    ],
    extlinks: undefined,
  },
  {
    label: 'CONNECT WITH US',
    items: [
      //{ label: '0800 123 456', href: undefined, icon: IconPhoneFilled },
      //{ label: 'insert.email@here.com', href: undefined, icon: IconMailFilled },
    ],
    extlinks: [
      //{ href: 'https://www.instagram.com/hiddentreasure', icon: IconBrandInstagram },
      {
        href: 'https://www.facebook.com/people/Hidden-Treasure/61574941850535/',
        icon: IconBrandFacebook,
      },
      //{ href: 'https://www.youtube.com/hiddentreasure', icon: IconBrandYoutube },
      /*{
        href: 'https://www.linkedin.com/company/hiddentreasure',
        icon: IconBrandLinkedin,
      }, */
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [signOpen, setSignOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div className="relative w-full" ref={footerRef}>
      <SignUpModal signOpen={signOpen} setSignOpen={setSignOpen} initialEmail={email} />
      <Image
        src={footerLogoSharpened}
        alt="Hidden Treasure Logo"
        className={`absolute bottom-0 left-0 z-0 hidden xl:block ${
          isVisible ? 'animate-bounce' : ''
        }`}
        style={{
          animation: isVisible ? 'bob 4s ease-in-out infinite 0.5s' : 'none',
        }}
        width={400}
        height={360}
        quality={100}
        priority
      />
      <div className="text-cyan-950 flex flex-wrap flex-row p-6 sm:p-10">
        <div
          className={`w-lg h-50 hidden xl:block pl-70 transition-all duration-1000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}
        >
          <p className="text-lg">SIGN UP NOW!</p>
          <form
            onSubmit={(event) => {
              setSignOpen(true)
              event.preventDefault()
            }}
          >
            <div
              className={`bg-cyan-950 text-stone-50 rounded-xl w-50 mt-3 flex flex-row justify-between pr-3 transition-all duration-1000 ease-out ${
                isVisible ? 'animate-bounce' : ''
              }`}
              style={{
                animation: isVisible ? 'bob 3s ease-in-out infinite 1s' : 'none',
              }}
            >
              <input
                type="text"
                className="rounded-l-xl pl-5 w-40 z-10"
                onChange={handleEmailChange}
              />
              <button type="submit" className="cursor-pointer">
                <IconArrowRight />
              </button>
            </div>
          </form>
        </div>

        <div
          className={`flex flex-wrap flex-row gap-8 sm:gap-20 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          {links.map((link, index) => (
            <div
              key={link.label}
              className={`transition-all duration-1000 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <p className="text-lg sm:text-xl font-bold mb-3">{link.label}</p>
              {link.items.map((item) => (
                <p key={item.label} className="text-sm sm:text-base mb-1">
                  {item.icon && <item.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 inline" />}
                  <a href={item.href} className={item.href ? 'hover:underline' : ''}>
                    {item.label}
                  </a>
                </p>
              ))}
              <div className="flex flex-row mt-4 sm:mt-5">
                {link.extlinks?.map((item, iconIndex) => (
                  <div
                    key={item.href}
                    className={`rounded-full bg-cyan-950 w-8 h-8 sm:w-7 sm:h-7 md:w-9 md:h-9 flex justify-center items-center mr-2 sm:mr-3 transition-all duration-1000 ease-out hover:shadow-lg hover:shadow-cyan-950/50 hover:scale-110 ${
                      isVisible ? 'animate-bounce' : ''
                    }`}
                    style={{
                      animation: isVisible
                        ? `bob 3s ease-in-out infinite ${1.5 + iconIndex * 0.2}s`
                        : 'none',
                    }}
                  >
                    <a href={item.href} className="flex justify-center items-center w-full h-full">
                      {item.icon && (
                        <item.icon className="h-4 w-4 sm:h-3 sm:w-3 md:h-5 md:w-5 text-stone-50" />
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`text-stone-950 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="w-50 hidden xl:block" />
        <p className="text-center text-sm sm:text-base">{`© ${new Date().getUTCFullYear()} Hidden Treasure. All rights reserved.`}</p>
      </div>

      <style jsx>{`
        @keyframes bob {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  )
}
