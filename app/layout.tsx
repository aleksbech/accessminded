import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin", "latin-ext"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Access Minded — WCAG 2.2 Audyty / Audits',
  description: 'Audyty WCAG 2.2, reaudyty i wsparcie wdrozen. Dostepnosc praktycznie, spokojnie i empatycznie. WCAG 2.2 audits, re-audits and implementation support.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/accessminded-logo.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'Access Minded — WCAG 2.2 Audyty / Audits',
    description: 'Audyty WCAG 2.2, reaudyty i wsparcie wdrozen. Dostepnosc praktycznie, spokojnie i empatycznie.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1220',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
