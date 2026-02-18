import Image from 'next/image'
import { facilitator } from './constants'

export default function FacilitatorSection() {
  return (
    <section id="facilitator" className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-12 text-center">
          Ведущий
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-72 h-96 md:w-80 md:h-[28rem] rounded-sm overflow-hidden relative">
              <Image
                src={facilitator.photoUrl}
                alt={facilitator.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 320px"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h3 className="font-serif text-3xl sm:text-4xl text-brand-dark mb-2">
              {facilitator.name}
            </h3>
            <p className="text-brand-clay font-medium mb-6">
              {facilitator.title}
            </p>
            <div className="text-brand-muted leading-relaxed mb-6 space-y-4">
              {facilitator.bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className={i === 0 ? 'text-lg' : 'text-base'}>{paragraph}</p>
              ))}
            </div>

            {/* Credentials */}
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

            {/* Telegram channel */}
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
      </div>
    </section>
  )
}
