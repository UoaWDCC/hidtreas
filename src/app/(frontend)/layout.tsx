import React from 'react'
import './global.css'
import localFont from 'next/font/local'

const k2d = localFont({
  src: [
    { path: '../../fonts/K2D-300.ttf', weight: '300', style: 'normal' },
    { path: '../../fonts/K2D-400.ttf', weight: '400', style: 'normal' },
    { path: '../../fonts/K2D-500.ttf', weight: '500', style: 'normal' },
    { path: '../../fonts/K2D-600.ttf', weight: '600', style: 'normal' },
    { path: '../../fonts/K2D-700.ttf', weight: '700', style: 'normal' },
    { path: '../../fonts/K2D-800.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-k2d',
  display: 'swap',
})

const inter = localFont({
  src: [
    { path: '../../fonts/Inter-100.ttf', weight: '100', style: 'normal' },
    { path: '../../fonts/Inter-200.ttf', weight: '200', style: 'normal' },
    { path: '../../fonts/Inter-300.ttf', weight: '300', style: 'normal' },
    { path: '../../fonts/Inter-400.ttf', weight: '400', style: 'normal' },
    { path: '../../fonts/Inter-500.ttf', weight: '500', style: 'normal' },
    { path: '../../fonts/Inter-600.ttf', weight: '600', style: 'normal' },
    { path: '../../fonts/Inter-700.ttf', weight: '700', style: 'normal' },
    { path: '../../fonts/Inter-800.ttf', weight: '800', style: 'normal' },
    { path: '../../fonts/Inter-900.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const kosugiMaru = localFont({
  src: '../../fonts/KosugiMaru-400.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-kosugi-maru',
  display: 'swap',
})

const coveredByYourGrace = localFont({
  src: '../../fonts/CoveredByYourGrace-400.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-covered',
  display: 'swap',
})

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
    <html
      lang="en"
      className={`${k2d.variable} ${inter.variable} ${kosugiMaru.variable} ${coveredByYourGrace.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
