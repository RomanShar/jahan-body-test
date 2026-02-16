import { Move, Wind, Volume2 } from 'lucide-react'
import { philosophyHeadline, philosophyCentralQuote, philosophyPillars, philosophyInsight, philosophyPermission } from './constants'

const iconMap = {
  move: Move,
  wind: Wind,
  'volume-2': Volume2,
}

export default function PhilosophySection() {
  return (
    <section id="about" className="bg-brand-cream py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          {philosophyHeadline}
        </h2>

        <blockquote className="text-center text-xl sm:text-2xl text-gray-600 italic max-w-2xl mx-auto mb-16">
          &laquo;{philosophyCentralQuote}&raquo;
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {philosophyPillars.map((pillar) => {
            const Icon = iconMap[pillar.iconName]

            return (
              <div key={pillar.name} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {pillar.name}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4 text-left sm:text-center">
                  &laquo;{pillar.quote}&raquo;
                </p>

                <p className="text-gray-500 text-xs leading-relaxed mt-3 border-t border-gray-200 pt-3">
                  {pillar.evidence}
                </p>
              </div>
            )
          })}
        </div>

        <blockquote className="text-center text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto mt-16 leading-relaxed border-l-4 border-purple-300 pl-6 sm:border-l-0 sm:pl-0">
          {philosophyInsight}
        </blockquote>

        <p className="text-center text-purple-600 font-medium text-lg max-w-xl mx-auto mt-6 italic">
          {philosophyPermission}
        </p>
      </div>
    </section>
  )
}
