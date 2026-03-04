
export default function CoupleSection() {
  return (
    <section className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Background hands photo */}
      <div className="absolute inset-0">
        <img
          src="/images/landing/breaks/couple-hands.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-dark/75" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed">
          «Мы прошли все трудности эмиграции и умудрились только укрепить свою связь как пары. Теперь мы хотим поделиться своим опытом с другими. У каждого человека уже есть всё, чтобы чувствовать себя счастливым.»
        </blockquote>
        <p className="mt-6 text-white/60 text-sm uppercase tracking-wider">
          Джахан и Дева Варша
        </p>
      </div>
    </section>
  )
}
