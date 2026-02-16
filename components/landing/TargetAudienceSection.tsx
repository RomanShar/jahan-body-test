import { Check, X } from 'lucide-react'
import { targetAudience, targetAudienceNotAbout, targetAudienceNotes } from './constants'

export default function TargetAudienceSection() {
  return (
    <section className="bg-white py-16 sm:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center">
          {targetAudience.headline}
        </h2>

        <div className="space-y-4 mb-16">
          {targetAudience.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* NOT about */}
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {targetAudienceNotAbout.headline}
        </h3>

        <div className="space-y-3 mb-12 max-w-md mx-auto">
          {targetAudienceNotAbout.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-gray-500 text-base">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="flex flex-wrap gap-3 justify-center">
          {targetAudienceNotes.map((note, index) => (
            <span
              key={index}
              className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium border border-purple-100"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
