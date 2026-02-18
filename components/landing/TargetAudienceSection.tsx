import { targetAudience, targetAudienceNotes } from './constants'

export default function TargetAudienceSection() {
  return (
    <section className="bg-brand-card py-16 sm:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-12 text-center">
          {targetAudience.headline}
        </h2>

        <div className="divide-y divide-brand-border max-w-[700px] mx-auto mb-12">
          {targetAudience.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 py-5"
            >
              <span className="text-brand-clay text-lg flex-shrink-0 mt-0.5">→</span>
              <p className="text-brand-muted text-lg leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-brand-light text-sm">
          {targetAudienceNotes.map((note, i) => (
            <span key={i}>
              {i > 0 && ' · '}
              ✓ {note}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
