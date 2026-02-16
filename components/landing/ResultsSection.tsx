import { Timer, Fingerprint, Heart, Home, Compass } from 'lucide-react'
import { resultsSection } from './constants'

const iconMap = {
  timer: Timer,
  fingerprint: Fingerprint,
  heart: Heart,
  home: Home,
  compass: Compass,
}

export default function ResultsSection() {
  return (
    <section className="bg-white py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-16 text-center">
          {resultsSection.headline}
        </h2>

        <div className="space-y-6">
          {resultsSection.items.map((item) => {
            const Icon = iconMap[item.iconName]
            return (
              <div
                key={item.number}
                className="flex items-start gap-5 p-5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <span className="text-purple-400 text-sm font-semibold tracking-wider">{item.number}</span>
                  <p className="text-gray-700 text-lg leading-relaxed mt-1">
                    {item.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
