import type { Metadata } from 'next'
import { Space_Grotesk, Playfair_Display, Bungee, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700']
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif-modern',
  weight: ['700'],
  style: ['normal', 'italic']
})

const bungee = Bungee({ 
  subsets: ['latin'],
  variable: '--font-bungee',
  weight: ['400']
})

export const metadata: Metadata = {
  title: 'Rajin | Elite Video Editor',
  description: 'Elite Video Editor for Global Creators & Agencies. Crafting visual stories that command attention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${bungee.variable} ${inter.variable} bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}
