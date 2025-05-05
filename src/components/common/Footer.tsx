import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

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
      { label: '0800 123 456', href: undefined, icon: PhoneIcon },
      { label: 'insert.email@here.com', href: undefined, icon: EnvelopeIcon },
    ],
    extlinks: [
      { href: 'https://www.instagram.com/hiddentreasure', icon: PhoneIcon },
      { href: 'https://www.facebook.com/hiddentreasure', icon: PhoneIcon },
      { href: 'https://www.youtube.com/hiddentreasure', icon: PhoneIcon },
      {
        href: 'https://www.linkedin.com/company/hiddentreasure',
        icon: 'linkedin',
      },
    ],
  },
]

export default function Footer() {
  return (
    <div className="w-full bg-cyan-600 text-cyan-950 flex flex-wrap flex-row p-10">
      <div className="w-lg">
        <p className="text-5xl font-bold">Hidden Treasure</p>
        <p>Preserving the past, inspiring the future</p>
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
                <a key={item.href} href={item.href}>
                  {item.icon && <item.icon className="h-5 w-5 mr-2 inline" />}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
