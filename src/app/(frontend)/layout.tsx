import React from 'react'
import './global.css'

export const metadata = {
  description: "A charity intended on preserving our community's hidden treasures.",
  title: 'Hidden Treasures',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-[#FDF4ED] text-[#13384E]">
        <main>{children}</main>
      </body>
    </html>
  )
}
