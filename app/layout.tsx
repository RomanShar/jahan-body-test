import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://selfhealing.space'),
  title: 'Суперблизость — телесный тренинг в Пенише, Португалия',
  description: 'Твоё тело помнит, как быть счастливым. 4 дня тишины, звука и океана для тех, кто устал быть сильным. Пениш, Португалия, 1–4 мая 2026.',
  openGraph: {
    title: 'Суперблизость — телесный тренинг в Португалии',
    description: 'Твоё тело помнит, как быть счастливым. 4 дня тишины, звука и океана. Пениш, 1–4 мая 2026.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/images/landing/og.webp',
        width: 1200,
        height: 630,
        alt: 'Суперблизость — телесный тренинг в Португалии',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Суперблизость — телесный тренинг',
    description: 'Твоё тело помнит, как быть счастливым. 4 дня тишины, звука и океана. Пениш, 1–4 мая 2026.',
    images: ['/images/landing/og.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
