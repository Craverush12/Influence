import type { Metadata } from 'next'
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

// Typography System - Premium Font Stack
// Display: Manrope (geometric, modern - similar to Satoshi)
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
  weight: ['400', '500', '700', '800'],
})

// Body: Inter (clean, readable - similar to GT America)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-gt-america',
  display: 'swap',
})

// Accent: JetBrains Mono (tech-forward - similar to Neue Machina)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-neue-machina',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Influx - Where Creators Converge',
  description: 'The platform where content creators and influencers collaborate, find opportunities, and build their creative empires. Join the influx of successful creators.',
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
