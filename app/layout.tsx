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
  title: 'Безопасно быть близко — телесный ретрит в Португалии',
  description: '4-дневный телесный ретрит в Пенише, Португалия. Движение, дыхание, звук. Для тех, кто хочет вернуть контакт с собой и близость. До 20 участников.',
  openGraph: {
    title: 'Безопасно быть близко — телесный ретрит',
    description: '4-дневный телесный ретрит в Португалии. Движение, дыхание, звук. До 20 участников.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/images/landing/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Безопасно быть близко — телесный ретрит в Португалии',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Безопасно быть близко — телесный ретрит',
    description: '4-дневный телесный ретрит в Португалии. Движение, дыхание, звук. До 20 участников.',
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
