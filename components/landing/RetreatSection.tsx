import Image from 'next/image'
import { retreatSection, retreatDays, retreatDailyRhythm } from './constants'

export default function RetreatSection() {
  return (
    <section id="program" className="bg-brand-card py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-4">
          {retreatSection.headline}
        </h2>
        <p className="text-brand-muted max-w-xl mx-auto">
          {retreatSection.location}. {retreatSection.locationDescription}
        </p>
      </div>

      {/* Checkerboard rows */}
      <div>
        {retreatDays.map((day, index) => {
          const isEven = index % 2 === 1

          return (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 min-h-[450px] ${
                isEven ? '' : ''
              }`}
            >
              {/* Text */}
              <div
                className={`bg-brand-card p-10 sm:p-12 flex flex-col justify-center ${
                  isEven ? 'md:order-2' : ''
                }`}
              >
                <p className="text-brand-sage uppercase tracking-widest text-xs mb-4">
                  День {day.day}
                </p>
                <h3 className="font-serif text-2xl text-brand-dark mb-2">
                  {day.title}
                </h3>
                <p className="text-brand-muted leading-relaxed mb-6">
                  {day.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {day.practices.map((practice, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-muted text-[15px]">
                      <span className="text-brand-sage mt-0.5">·</span>
                      {practice}
                    </li>
                  ))}
                </ul>

                {day.emotionalArc && (
                  <p className="italic text-brand-muted text-sm border-l-2 border-brand-sage-light pl-4">
                    {day.emotionalArc}
                  </p>
                )}
              </div>

              {/* Image */}
              <div
                className={`relative min-h-[300px] md:min-h-0 ${
                  isEven ? 'md:order-1 order-first' : ''
                } ${!isEven ? '' : 'order-first md:order-1'}`}
              >
                {day.image && (
                  <Image
                    src={day.image}
                    alt={`День ${day.day}: ${day.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Daily Rhythm */}
      <div className="max-w-4xl mx-auto px-6 py-20 sm:py-24">
        <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark mb-3 text-center">
          {retreatDailyRhythm.headline}
        </h3>
        <p className="text-brand-muted text-sm text-center mb-12 max-w-lg mx-auto">
          {retreatDailyRhythm.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {retreatDailyRhythm.periods.map((period) => (
            <div key={period.time} className="text-center">
              <p className="text-brand-sage uppercase tracking-widest text-xs mb-3">
                {period.time}
              </p>
              <p className="text-brand-muted text-[15px] leading-relaxed">
                {period.description}
              </p>
            </div>
          ))}
        </div>

        <p className="italic text-brand-muted text-sm text-center border-t border-brand-border pt-8 max-w-2xl mx-auto">
          {retreatDailyRhythm.integrationNote}
        </p>
      </div>
    </section>
  )
}
