const links = [
  {
    label: 'QUICK LINKS',
    items: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Events', href: '/events' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'Our Values', href: '/values' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    label: 'GET INVOLVED',
    items: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Donate', href: '/donate' },
      { label: 'Membership', href: '/membership' },
      { label: 'Sponsorship', href: '/sponsorship' },
      { label: 'Partnership', href: '/partnership' },
    ],
  },
]

export default function Footer() {
  return (
    <div className="w-full bg-cyan-600 text-cyan-950 flex flex-wrap flex-row p-10">
      <div className="w-lg bg-cyan-100">
        <p className="text-5xl font-bold">Hidden Treasure</p>
        <p>Preserving the past, inspiring the future</p>
      </div>
      <div className="flex flex-wrap flex-row gap-20">
        {links.map((link) => (
          <div key={link.label}>
            <p className="text-xl font-bold ">{link.label}</p>
            {link.items.map((item) => (
              <p key={item.label}>
                <a href={item.href} className="hover:text-cyan-800 hover:underline">
                  {item.label}
                </a>
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
