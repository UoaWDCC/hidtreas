import React from 'react'
import './global.css'

import { K2D, Inter, Tajawal } from 'next/font/google'

const k2d = K2D({
  subsets: ['latin'],
  variable: '--font-k2d',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  description: "A charity intended on preserving our community's hidden treasures.",
  title: 'Hidden Treasures',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${k2d.variable} ${inter.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
