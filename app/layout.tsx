import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Elegant body font - Poppins (sophisticated, modern, elegant)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

// Elegant display font - Playfair Display (classy, sophisticated serif)
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Creator Hub - Connect. Collaborate. Create Magic.',
  description: 'The platform where influencers and creators unite. Discover collaborators, grow your audience, and build something extraordinary.',
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{
      '--font-poppins': poppins.style.fontFamily,
      '--font-playfair': playfair.style.fontFamily,
    } as React.CSSProperties}>
      <body className={poppins.className} style={{ 
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: 'var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
