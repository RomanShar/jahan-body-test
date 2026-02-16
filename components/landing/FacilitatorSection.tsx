import Image from 'next/image'
import { facilitator } from './constants'

export default function FacilitatorSection() {
  return (
    <section id="facilitator" className="bg-white py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg shadow-purple-200/30 relative">
              <Image
                src={facilitator.photoUrl}
                alt={facilitator.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              {facilitator.name}
            </h2>
            <p className="text-purple-600 font-medium mb-6">
              {facilitator.title}
            </p>
            <blockquote className="text-gray-600 text-lg leading-relaxed mb-6 border-l-4 border-purple-200 pl-6 italic space-y-4">
              {facilitator.bio.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </blockquote>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2">
              {facilitator.credentials.map((credential, index) => (
                <span
                  key={index}
                  className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium border border-purple-100"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
