import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { cookies } from 'next/headers'
import './globals.css'

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://accessminded.com'),
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
    images: [
      {
        url: '/images/hero-wcag-audit.jpg',
        width: 1200,
        height: 630,
        alt: 'Access Minded — WCAG 2.2 accessibility audits',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1220',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('lang')?.value === 'en' ? 'en' : 'pl'

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="aurora-bg" aria-hidden="true">
          <span className="aurora-blob-3" />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
