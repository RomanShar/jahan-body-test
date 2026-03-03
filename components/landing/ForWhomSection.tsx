'use client'

import Image from 'next/image'
import { useModal } from './ModalProvider'

const columns = [
  {
    title: 'Для женщин',
    items: [
      'которые многое понимают про себя, но тело остаётся «под контролем»',
      'которые устали быть сильными и всё держать на себе',
      'которые чувствуют, что желание стало редким или требующим усилия',
      'которые хотят снова ощущать себя живой, тёплой, чувствительной',
      'которые хотят вернуть чувственное притяжение — к себе и к партнёру',
    ],
    image: '/images/landing/results/target-women.webp',
    alt: 'Женщины на ретрите',
  },
  {
    title: 'Для мужчин',
    items: [
      'которые устали жить в режиме постоянной собранности',
      'которым важно чувствовать, а не только функционировать',
      'которые хотят вернуть глубину в сексе',
      'которые хотят быть в контакте без давления и ожиданий',
      'которые чувствуют, что в отношениях стало слишком много слов и мало игры',
    ],
    image: '/images/landing/results/target-men.webp',
    alt: 'Мужчина на ретрите',
  },
  {
    title: 'Для пар',
    items: [
      'которые любят друг друга, но чувствуют, что огонь стал тише',
      'которые хотят вернуть напряжение между мужчиной и женщиной',
      'которые много разговаривают, но возбуждение не возвращается',
      'которые хотят, чтобы дом снова стал местом тепла, а не переговорной',
      'которые готовы работать не с обвинениями, а с собой',
    ],
    image: '/images/landing/results/target-couples.webp',
    alt: 'Пара на ретрите',
  },
]

export default function ForWhomSection() {
  const { openModal } = useModal()

  return (
    <section className="bg-brand-body py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark">
            Для кого этот ретрит
          </h2>
          <button
            onClick={openModal}
            className="bg-brand-clay text-white px-8 py-3 text-[13px] uppercase tracking-wider font-bold hover:bg-brand-clay-hover transition-colors self-start sm:self-auto"
          >
            Занять место
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-end">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="font-serif text-xl text-brand-dark mb-4 uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="space-y-3 mb-6 flex-1">
                {col.items.map((item, i) => (
                  <li key={i} className="text-brand-muted text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-brand-sage mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={90}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
