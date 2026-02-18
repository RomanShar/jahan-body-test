import Script from 'next/script'
import { faqItems } from './constants'

export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: 'Суперблизость - Телесный тренинг',
        description: 'Телесный тренинг, который возвращает мощь, энергию и притягательность. 4 дня в Португалии у океана - движение, дыхание, звук.',
        url: 'https://selfhealing.space',
        startDate: '2026-05-01T15:00:00+01:00',
        endDate: '2026-05-04T12:00:00+01:00',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'PPL Ocean Retreat Centre',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Peniche',
            addressRegion: 'Leiria',
            addressCountry: 'PT',
          },
        },
        image: [
          'https://selfhealing.space/images/landing/hero.webp',
          'https://selfhealing.space/images/landing/venue/hero-venue.webp',
        ],
        organizer: {
          '@type': 'Person',
          name: 'Джахан',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '490',
          highPrice: '790',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-02-16T00:00:00+00:00',
        },
        performer: {
          '@type': 'Person',
          name: 'Джахан',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
