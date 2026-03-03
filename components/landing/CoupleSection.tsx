import Image from 'next/image'

export default function CoupleSection() {
  return (
    <section className="bg-brand-card py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo */}
          <div className="w-full md:w-1/2 relative aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/images/landing/facilitators/jahan-varsha.webp"
              alt="Джахан и Дева Варша"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
                />
          </div>

          {/* Quote */}
          <div className="w-full md:w-1/2">
            <blockquote className="font-serif text-xl sm:text-2xl text-brand-dark leading-relaxed">
              «Мы прошли все трудности эмиграции и умудрились только укрепить свою связь как пары. Теперь мы хотим поделиться своим опытом с другими. У каждого человека уже есть всё, чтобы чувствовать себя счастливым.»
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
