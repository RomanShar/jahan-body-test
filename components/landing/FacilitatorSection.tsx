import Image from 'next/image'
import { facilitator, coFacilitator } from './constants'

export default function FacilitatorSection() {
  return (
    <section id="facilitator" className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-16 text-center">
          Кто мы
        </h2>

        {/* Jahan */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20">
          <div className="flex-shrink-0">
            <div className="w-72 h-96 md:w-80 md:h-[28rem] rounded-sm overflow-hidden relative">
              <Image
                src={facilitator.photoUrl}
                alt={facilitator.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 320px"
                quality={90}
                />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-2">
              {facilitator.name}
            </h3>
            <p className="text-brand-clay font-medium mb-6">
              {facilitator.title}
            </p>
            {facilitator.bio && (
              <div className="text-brand-muted leading-relaxed mb-6 space-y-4">
                {facilitator.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className={i === 0 ? 'text-lg' : 'text-base'}>{paragraph}</p>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mb-6">
              {facilitator.credentials.map((credential, index) => (
                <span
                  key={index}
                  className="bg-brand-body text-brand-muted px-4 py-1.5 text-sm border border-brand-border"
                >
                  {credential}
                </span>
              ))}
            </div>
            <a
              href={facilitator.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-clay underline underline-offset-4 text-[15px] hover:text-brand-clay-hover transition-colors"
            >
              {facilitator.telegramChannelText}
            </a>
          </div>
        </div>

        {/* Deva Varsha */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
          <div className="flex-shrink-0">
            <div className="w-72 h-96 md:w-80 md:h-[28rem] rounded-sm overflow-hidden relative bg-brand-card">
              <Image
                src={coFacilitator.photoUrl}
                alt={coFacilitator.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 320px"
                quality={90}
                />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-2">
              {coFacilitator.name}
            </h3>
            <p className="text-brand-clay font-medium mb-6">
              {coFacilitator.title}
            </p>
            <p className="text-brand-muted text-lg leading-relaxed">
              {coFacilitator.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
