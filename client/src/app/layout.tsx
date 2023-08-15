import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskTrackr',
  description: 'Created for QuickSell Interview',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html  lang="en">
      <body style={{"backgroundColor":"#3d3d4e"}} className={`${inter.className} overflow-y-hidden `}>{children}</body>
    </html>
  )
}
