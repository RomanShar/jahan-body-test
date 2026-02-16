import { devaluation } from './constants'

export default function DevaluationSection() {
  return (
    <section className="bg-brand-dark py-16 sm:py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <p className="text-white font-semibold text-xl mb-4">{devaluation.headline}</p>
          <div className="space-y-2 mb-6">
            {devaluation.items.map((item, index) => (
              <p key={index} className="text-gray-300 text-lg italic leading-relaxed">{item}</p>
            ))}
          </div>
          <p className="text-gray-200 leading-relaxed text-lg">{devaluation.response}</p>
        </div>
      </div>
    </section>
  )
}
