import Image from 'next/image'
import { MapPin, Navigation } from 'lucide-react'
import { venue, venueHighlights, accommodationTiers, venueLocation, pricingTiers, pricing } from './constants'

export default function VenueSection() {
  return (
    <section id="venue" className="bg-brand-body py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-3 text-center">
          {venue.headline}
        </h2>
        <p className="text-lg text-brand-muted text-center mb-4">
          {venue.subtitle}
        </p>
        <p className="text-brand-muted text-center mb-12 max-w-2xl mx-auto">
          {venue.description}
        </p>

      </div>

      {/* Hero venue photo — full-bleed cinematic */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[2.5/1] overflow-hidden mb-12">
        <Image
          src="/images/landing/venue/hero-venue.webp"
          alt="PPL Ocean Retreat Centre - вид с высоты, рядом с океаном"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
          <p className="text-white font-serif text-xl sm:text-2xl drop-shadow-lg">
            PPL Ocean Retreat Centre
          </p>
          <p className="text-white/80 text-sm sm:text-base drop-shadow-lg">
            Сан-Бернардино, рядом с Пенише
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* Venue highlights - asymmetric grid: first photo larger */}
        <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 mb-16">
          {venueHighlights.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-sm overflow-hidden ${
                i === 0
                  ? 'col-span-2 row-span-2 aspect-[4/3] md:aspect-auto'
                  : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className={`absolute bottom-2 left-3 right-3 text-white font-medium ${
                i === 0 ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
              }`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Accommodation - 3 tier cards */}
        <div className="mb-16">
          <h3 className="font-serif text-xl text-brand-dark mb-2 text-center">
            Варианты размещения
          </h3>
          <p className="text-brand-light text-sm text-center mb-6">
            Все комнаты с отдельными кроватями · До 20 гостей
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accommodationTiers.map((tier, i) => {
              const earlyBirdActive = new Date(pricing.earlyBirdDeadline).getTime() > Date.now()
              const pt = pricingTiers[i]
              const displayPrice = earlyBirdActive && pt?.earlyBird ? pt.earlyBird : pt?.price

              return (
                <div key={i} className="bg-brand-card overflow-hidden border border-brand-border">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={tier.image}
                      alt={tier.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-baseline justify-between">
                      <p className="font-medium text-brand-dark text-sm">{tier.name}</p>
                      {displayPrice && (
                        <p className="text-brand-clay font-serif text-lg">от €{displayPrice}</p>
                      )}
                    </div>
                    <p className="text-brand-light text-xs mt-1">{tier.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Location */}
        <div className="bg-brand-card p-6 sm:p-8 border border-brand-border mb-8">
          <h3 className="font-serif text-xl text-brand-dark mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-sage" />
            Расположение
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {Object.values(venueLocation).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-brand-muted text-sm">
                <Navigation className="w-4 h-4 text-brand-sage mt-0.5 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <p className="text-brand-light text-xs mb-3">{venue.address}</p>
          <a
            href={venue.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-clay hover:text-brand-clay-hover text-sm font-medium transition inline-flex items-center gap-1"
          >
            Открыть в Google Maps →
          </a>
        </div>

        {/* Link to PPL Ocean */}
        <div className="text-center">
          <a
            href={venue.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-clay hover:text-brand-clay-hover font-medium transition inline-flex items-center gap-1"
          >
            {venue.linkText}
          </a>
        </div>
      </div>
    </section>
  )
}
