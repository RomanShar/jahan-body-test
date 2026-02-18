import { retreatSafety, safetyHeadline, safetySubheadline } from './constants'

export default function SafetySection() {
  return (
    <section className="bg-brand-body py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="font-serif text-2xl text-brand-dark mb-2">{safetyHeadline}</h3>
        <p className="text-brand-muted mb-6">{safetySubheadline}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {retreatSafety.map((item) => (
            <div key={item} className="flex items-center gap-2 text-left">
              <span className="text-brand-sage font-bold">✓</span>
              <span className="text-brand-muted text-[15px]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
