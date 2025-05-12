import React from 'react'
import './global.css'

import { K2D, Inter, Tajawal } from 'next/font/google'

const k2d = K2D({
  subsets: ['latin'],
  variable: '--font-k2d',
  weight: ['400'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400'],
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['400'],
})

export const metadata = {
  description: "A charity intended on preserving our community's hidden treasures.",
  title: 'Hidden Treasures',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${k2d.variable} ${inter.variable} ${tajawal.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
