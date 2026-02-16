import Image from 'next/image'
import { Home, Waves, Sparkles, Flower2, TreePalm } from 'lucide-react'
import { venue, venueFeatures, venueRooms } from './constants'

const venuePhotos = [
  { src: '/images/landing/venue/venue-1.jpg', alt: 'PPL Ocean Retreat Centre — вид на территорию' },
  { src: '/images/landing/venue/venue-2.jpg', alt: 'PPL Ocean Retreat Centre — бассейн' },
  { src: '/images/landing/venue/venue-3.jpg', alt: 'PPL Ocean Retreat Centre — пространство для практик' },
  { src: '/images/landing/venue/venue-4.jpg', alt: 'PPL Ocean Retreat Centre — зона отдыха' },
]

const iconMap = {
  '🏡': Home,
  '🏊': Waves,
  '🧖': Sparkles,
  '🧘': Flower2,
  '🌊': Waves,
  '🌳': TreePalm,
}

export default function VenueSection() {
  return (
    <section className="bg-brand-cream py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-3 text-center">
          {venue.headline}
        </h2>
        <p className="text-lg text-gray-500 text-center mb-4">
          {venue.subtitle}
        </p>
        <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
          {venue.description}
        </p>

        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto italic leading-relaxed">
          {venue.sensoryLine}
        </p>

        {/* Photo gallery */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {venuePhotos.map((photo, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {venueFeatures.map((feature, i) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
              >
                {IconComponent ? (
                  <IconComponent className="w-6 h-6 text-purple-500 flex-shrink-0" />
                ) : (
                  <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                )}
                <span className="text-gray-700">{feature.text}</span>
              </div>
            )
          })}
        </div>

        {/* Rooms */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Комнаты</h3>
          <ul className="space-y-2">
            {venueRooms.map((room, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600">
                <span className="text-purple-500 mt-1">&#x2022;</span>
                {room}
              </li>
            ))}
          </ul>
        </div>

        {/* Link */}
        <div className="text-center">
          <a
            href={venue.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 font-medium transition inline-flex items-center gap-1"
          >
            {venue.linkText}
          </a>
        </div>
      </div>
    </section>
  )
}
