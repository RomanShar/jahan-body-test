import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.selfhealing.space'),
  title: 'Ретрит телесной близости — Пенише, Португалия, 1–4 мая 2026',
  description: 'В голове — терапия, книги, понимание. В теле — всё тот же зажим. 4 дня движения, дыхания и звука у океана.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Ретрит телесной близости — Пенише, Португалия, 1–4 мая 2026',
    description: 'В голове — терапия, книги, понимание. В теле — всё тот же зажим. 4 дня движения, дыхания и звука у океана.',
    url: '/',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/images/landing/og.webp',
        width: 1200,
        height: 630,
        alt: 'Ретрит телесной близости — Пенише, Португалия',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ретрит телесной близости — Пенише, Португалия',
    description: 'В голове — терапия, книги, понимание. В теле — всё тот же зажим. 4 дня движения, дыхания и звука у океана.',
    images: ['/images/landing/og.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
