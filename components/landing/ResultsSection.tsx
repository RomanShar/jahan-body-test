import Image from 'next/image'
import { resultsSection } from './constants'

export default function ResultsSection() {
  return (
    <section className="bg-brand-card py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-16 text-center">
          {resultsSection.headline}
        </h2>

        <div className="space-y-20">
          {resultsSection.items.map((item, i) => (
            <div
              key={item.number}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
            >
              {/* Photo */}
              <div className="w-full md:w-1/2 relative aspect-[3/2] rounded-sm overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
                {'tag' in item && (item as { tag?: string }).tag && (
                  <span className="absolute top-4 left-4 bg-white/90 text-brand-dark text-xs uppercase tracking-wider px-3 py-1 font-medium">
                    {(item as { tag?: string }).tag}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <span className="text-brand-clay font-serif text-2xl">{item.number}</span>
                <h3 className="font-serif text-xl sm:text-2xl text-brand-dark mt-2 mb-4">
                  {item.title}
                </h3>
                <p className="text-brand-muted leading-relaxed mb-4">
                  {item.text}
                </p>
                {item.results.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {item.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-brand-muted text-sm">
                        <span className="text-brand-sage mt-0.5">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
                {item.closing && (
                  <p className="text-brand-dark font-medium text-sm italic">
                    {item.closing}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
