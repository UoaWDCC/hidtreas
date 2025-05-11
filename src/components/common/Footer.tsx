import {
  IconPhoneFilled,
  IconMailFilled,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandYoutube,
} from '@tabler/icons-react'
import Image from 'next/image'

// TODO: Make sure that the links are correct
const links: {
  label: string
  items: { label: string; href: string | undefined; icon: any }[]
  extlinks: { href: string; icon: any }[] | undefined
}[] = [
  {
    label: 'QUICK LINKS',
    items: [
      { label: 'Home', href: '/', icon: undefined },
      { label: 'About Us', href: '/about', icon: undefined },
      { label: 'Events', href: '/events', icon: undefined },
      { label: 'Blogs', href: '/blogs', icon: undefined },
      { label: 'Our Values', href: '/values', icon: undefined },
      { label: 'Contact Us', href: '/contact', icon: undefined },
    ],
    extlinks: undefined,
  },
  {
    label: 'GET INVOLVED',
    items: [
      { label: 'Volunteer', href: '/volunteer', icon: undefined },
      { label: 'Donate', href: '/donate', icon: undefined },
      { label: 'Membership', href: '/membership', icon: undefined },
      { label: 'Sponsorship', href: '/sponsorship', icon: undefined },
      { label: 'Partnership', href: '/partnership', icon: undefined },
    ],
    extlinks: undefined,
  },
  {
    label: 'CONNECT WITH US',
    items: [
      { label: '0800 123 456', href: undefined, icon: IconPhoneFilled },
      { label: 'insert.email@here.com', href: undefined, icon: IconMailFilled },
    ],
    extlinks: [
      { href: 'https://www.instagram.com/hiddentreasure', icon: IconBrandInstagram },
      { href: 'https://www.facebook.com/hiddentreasure', icon: IconBrandFacebook },
      { href: 'https://www.youtube.com/hiddentreasure', icon: IconBrandYoutube },
      {
        href: 'https://www.linkedin.com/company/hiddentreasure',
        icon: IconBrandLinkedin,
      },
    ],
  },
]

export default function Footer() {
  return (
    <div className="relative bg-orange-100 w-full">
      <Image
        src="/footerLogo.png"
        alt="Hidden Treasure Logo"
        className="absolute w-115 h-100 bottom-0 left-0 z-0 invisible xl:visible"
        width={115}
        height={100}
      />
      <div className="text-cyan-950 flex flex-wrap flex-row p-10">
        <div className="w-lg h-50 hidden xl:block">
          <p className="text-5xl font-bold">Hidden Treasure</p>
        </div>

        <div className="flex flex-wrap flex-row gap-20">
          {links.map((link) => (
            <div key={link.label}>
              <p className="text-xl font-bold mb-3">{link.label}</p>
              {link.items.map((item) => (
                <p key={item.label}>
                  {item.icon && <item.icon className="h-5 w-5 mr-2 inline" />}
                  <a href={item.href} className={item.href ? 'hover:underline' : ''}>
                    {item.label}
                  </a>
                </p>
              ))}
              <div className="flex flex-row mt-5">
                {link.extlinks?.map((item) => (
                  <div
                    key={item.href}
                    className="rounded-full bg-cyan-950 w-7 h-7 flex justify-center items-center mr-3"
                  >
                    <a href={item.href}>
                      {item.icon && <item.icon className="h-5 w-5 text-stone-50" />}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-stone-950 p-5 flex flex-row justify-between">
        <div className="w-50 hidden xl:block" />
        <p className="text-center">© 2023 Hidden Treasure. All rights reserved.</p>
        <div className="flex flex-row gap-5">
          <a href="/privacy" className="text-center">
            FAQ
          </a>
          <a href="/privacy" className="text-center">
            Privacy Policy
          </a>
          <a href="/privacy" className="text-center">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  )
}
