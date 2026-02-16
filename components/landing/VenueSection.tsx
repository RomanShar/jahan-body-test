import Image from 'next/image'
import { Home, Waves, Sparkles, Flower2, TreePalm, Music, Palette, Sun, UtensilsCrossed, MapPin, Navigation } from 'lucide-react'
import { venue, venueFeatures, venueRooms, venueIndoor, venueOutdoor, venueLocation, venuePhotos } from './constants'

const iconMap: Record<string, typeof Home> = {
  '🏡': Home,
  '🏊': Waves,
  '🧖': Sparkles,
  '🧘': Flower2,
  '🌊': Waves,
  '🌳': TreePalm,
  '🎵': Music,
  '🎨': Palette,
  '☀️': Sun,
  '🍳': UtensilsCrossed,
}

export default function VenueSection() {
  return (
    <section id="venue" className="bg-brand-cream py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-3 text-center">
          {venue.headline}
        </h2>
        <p className="text-lg text-gray-500 text-center mb-4">
          {venue.subtitle}
        </p>
        <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          {venue.description}
        </p>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto italic leading-relaxed">
          {venue.sensoryLine}
        </p>

        {/* Photo gallery — 2x4 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {venuePhotos.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl shadow-md ${
                i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
              />
            </div>
          ))}
        </div>

        {/* Features grid — 2x5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
          {venueFeatures.map((feature, i) => {
            const IconComponent = iconMap[feature.icon]
            return (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
              >
                {IconComponent ? (
                  <IconComponent className="w-5 h-5 text-purple-500 flex-shrink-0" />
                ) : (
                  <span className="text-xl flex-shrink-0">{feature.icon}</span>
                )}
                <span className="text-gray-700 text-sm">{feature.text}</span>
              </div>
            )
          })}
        </div>

        {/* Indoor & Outdoor Spaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Indoor */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4">Внутренние пространства</h3>
            <div className="grid grid-cols-2 gap-3">
              {venueIndoor.map((space, i) => (
                <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                  <Image src={space.image} alt={space.text} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 right-3 text-white text-xs font-medium">{space.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outdoor */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4">На открытом воздухе</h3>
            <div className="grid grid-cols-2 gap-3">
              {venueOutdoor.map((space, i) => (
                <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                  <Image src={space.image} alt={space.text} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 right-3 text-white text-xs font-medium">{space.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div className="mb-16">
          <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2 text-center">Размещение</h3>
          <p className="text-gray-500 text-sm text-center mb-6">До 20 гостей · Все комнаты с отдельными кроватями</p>

          {/* Suites */}
          <p className="text-sm font-medium text-purple-600 mb-3 uppercase tracking-wide">Сьюты с собственной ванной</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {venueRooms.suites.map((room, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={room.image} alt={`Комната ${room.name}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <div className="p-3">
                  <p className="font-medium text-gray-800 text-sm">&laquo;{room.name}&raquo;</p>
                  <p className="text-gray-500 text-xs mt-1">{room.beds} кровати · {room.floor} этаж</p>
                  <p className="text-gray-400 text-xs mt-0.5">{room.features}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shared rooms */}
          <p className="text-sm font-medium text-purple-600 mb-3 uppercase tracking-wide">Комнаты с общей ванной</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {venueRooms.shared.map((room, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-4">
                  <p className="font-medium text-gray-800 text-sm">&laquo;{room.name}&raquo;</p>
                  <p className="text-gray-500 text-xs mt-1">{room.beds} кровати · {room.floor} этаж</p>
                  <p className="text-gray-400 text-xs mt-0.5">{room.features}</p>
                </div>
              </div>
            ))}
            {/* Facilitator studio */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image src={venueRooms.facilitator.image} alt="Студия фасилитатора" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="p-3">
                <p className="text-gray-500 text-xs">{venueRooms.facilitator.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h3 className="font-serif text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            Расположение
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {Object.values(venueLocation).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                <Navigation className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mb-3">{venue.address}</p>
          <a
            href={venue.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 text-sm font-medium transition inline-flex items-center gap-1"
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
            className="text-purple-600 hover:text-purple-700 font-medium transition inline-flex items-center gap-1"
          >
            {venue.linkText}
          </a>
        </div>
      </div>
    </section>
  )
}
