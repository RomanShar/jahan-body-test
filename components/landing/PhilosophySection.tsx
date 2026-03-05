
import { philosophyHeadline, philosophyPillars, philosophyInsight, philosophyPermission } from './constants'
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll'
export default function PhilosophySection() {
  const { visibleItems: visiblePillars, itemsRef: pillarsRef } = useAnimateOnScroll<HTMLDivElement>()

  return (
    <section id="philosophy" className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-16 text-center">
          {philosophyHeadline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {philosophyPillars.map((pillar, index) => (
              <div
                key={pillar.name}
                ref={(el) => { pillarsRef.current[index] = el }}
                data-index={index}
                className={`bg-brand-card p-10 text-center transition-[opacity,transform] duration-700 ${visiblePillars.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <p className="text-brand-clay uppercase tracking-widest text-xs mb-3">
                  {pillar.name}
                </p>

                <hr className="border-brand-border mb-4 mx-auto w-16" />

                <p className="text-brand-dark text-[15px] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
        </div>

        <blockquote className="text-center text-xl sm:text-2xl text-brand-dark max-w-2xl mx-auto mt-16 leading-relaxed">
          {philosophyInsight}
        </blockquote>

        <p className="text-center text-brand-muted italic text-lg max-w-xl mx-auto mt-8">
          {philosophyPermission}
        </p>
      </div>
    </section>
  )
}
