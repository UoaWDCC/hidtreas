import React from 'react'
import './global.css'

import { K2D, Inter, Kosugi_Maru, Covered_By_Your_Grace } from 'next/font/google'

const k2d = K2D({
  subsets: ['latin'],
  variable: '--font-k2d',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const kosugiMaru = Kosugi_Maru({ subsets: ['latin'], weight: '400', variable: '--font-kosugi-maru' })
const coveredByYourGrace = Covered_By_Your_Grace({ subsets: ['latin'], weight: '400', variable: '--font-covered' })

export const metadata = {
  description: "A charity intended on preserving our community's hidden treasures.",
  title: 'Hidden Treasure',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${k2d.variable} ${inter.variable} ${kosugiMaru.variable} ${coveredByYourGrace.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
