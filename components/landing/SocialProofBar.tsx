import { socialProof } from './constants'

export default function SocialProofBar() {
  return (
    <section className="bg-brand-dark py-5 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-white text-sm">
        {socialProof.items.map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            {i > 0 && <span>·</span>}
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
