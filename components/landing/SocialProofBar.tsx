import { socialProof } from './constants'

export default function SocialProofBar() {
  return (
    <section className="bg-brand-dark/50 border-y border-white/5 py-6 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
        {socialProof.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
