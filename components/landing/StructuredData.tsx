import Script from 'next/script'
import { faqItems, pricingTiers } from './constants'

export default function StructuredData() {
  const allPrices = pricingTiers.flatMap(t => [Number(t.earlyBird || t.price), Number(t.price)])
  const lowPrice = Math.min(...allPrices)
  const highPrice = Math.max(...allPrices)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: 'Суперблизость - Телесный тренинг',
        description: 'Телесный тренинг, который возвращает мощь, энергию и притягательность. 4 дня в Португалии у океана - движение, дыхание, звук.',
        url: 'https://www.selfhealing.space',
        startDate: '2026-05-01T15:00:00+01:00',
        endDate: '2026-05-04T12:00:00+01:00',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'PPL Ocean Retreat Centre',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Estrada Municipal 564',
            postalCode: '2520-614',
            addressLocality: 'Peniche',
            addressRegion: 'Leiria',
            addressCountry: 'PT',
          },
        },
        image: [
          'https://www.selfhealing.space/images/landing/hero-generated.webp',
          'https://www.selfhealing.space/images/landing/venue/hero-venue.webp',
        ],
        organizer: {
          '@type': 'Person',
          name: 'Джахан',
        },
        duration: 'P4D',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice,
          highPrice,
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
