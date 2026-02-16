import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://selfhealing.space'),
  title: 'Суперблизость — телесный тренинг в Пенише, Португалия',
  description: '3 полных дня телесного тренинга в Пенише. Движение, дыхание, звук. Для тех, кто хочет вернуть контакт с собой и близость. 8 из 20 мест забронировано.',
  openGraph: {
    title: 'Суперблизость — телесный тренинг в Португалии',
    description: '3 полных дня телесного тренинга в Пенише. Движение, дыхание, звук. 8 из 20 мест забронировано.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/images/landing/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Суперблизость — телесный тренинг в Португалии',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Суперблизость — телесный тренинг',
    description: '3 полных дня телесного тренинга в Пенише. Движение, дыхание, звук. 8 из 20 мест забронировано.',
    images: ['/images/landing/og.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>{children}</body>
    </html>
  )
}
