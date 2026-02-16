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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Event',
      name: 'Безопасно быть близко — телесный ретрит',
      description: '4-дневный телесный ретрит. Движение, дыхание, звук. Для тех, кто хочет вернуть контакт с собой и близость.',
      startDate: '2026-05-01',
      endDate: '2026-05-04',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: 'PPL Ocean Retreat Centre',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sao Bernardino, Peniche',
          addressCountry: 'PT',
        },
      },
      organizer: {
        '@type': 'Person',
        name: 'Джахан',
        jobTitle: 'Практик телесной работы, преподаватель школы шиацу',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Комната на троих',
          price: '590',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/LimitedAvailability',
        },
        {
          '@type': 'Offer',
          name: 'Комната на двоих',
          price: '690',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/LimitedAvailability',
        },
        {
          '@type': 'Offer',
          name: 'Одноместная',
          price: '790',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/LimitedAvailability',
        },
      ],
      inLanguage: 'ru',
      maximumAttendeeCapacity: 20,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чем это отличается от терапии?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Терапия работает через слова и мысли. Телесный ретрит работает через тело — дыхание, движение, звук. Это не замена терапии — это дополнение, которое работает на другом уровне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Это тантра?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет. Ретрит — про контакт с телом через движение, дыхание и звук. Без сексуализации. Все практики в одежде.',
          },
        },
        {
          '@type': 'Question',
          name: 'Это не секта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет. Это четырёхдневный ретрит с конкретными телесными практиками. Нет идеологии, нет гуру, нет обязательств. Вы можете уйти в любой момент. Все практики добровольны.',
          },
        },
        {
          '@type': 'Question',
          name: 'Безопасно ли это эмоционально?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да. Все практики проходят в контролируемом пространстве с опытным фасилитатором. Мы работаем постепенно. Вы всегда можете остановиться.',
          },
        },
        {
          '@type': 'Question',
          name: 'Нужна ли физическая подготовка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет. Практики адаптируются под любой уровень физической формы. Это не фитнес и не йога — это работа с ощущениями, дыханием и звуком.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какова политика возврата?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Полный возврат при отмене за 14+ дней до начала. 50% возврат при отмене за 7–14 дней. Менее 7 дней — перенос на следующий ретрит.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>{children}</body>
    </html>
  )
}
