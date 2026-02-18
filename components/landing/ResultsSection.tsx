import { resultsSection } from './constants'

export default function ResultsSection() {
  return (
    <section className="bg-brand-card py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-16 text-center">
          {resultsSection.headline}
        </h2>

        <div className="divide-y divide-brand-border">
          {resultsSection.items.map((item) => (
            <div
              key={item.number}
              className="flex items-start gap-5 py-6"
            >
              <span className="text-brand-clay font-serif text-2xl flex-shrink-0 w-10">
                {item.number}
              </span>
              <p className="text-brand-muted text-lg leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
