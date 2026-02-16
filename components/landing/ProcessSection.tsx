import { FileText, Phone, Plane, Heart } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Оставьте заявку',
    description: 'Заполните короткую форму — это займёт 2 минуты',
    Icon: FileText,
  },
  {
    number: '02',
    title: 'Короткое интервью',
    description: 'Познакомимся, ответим на вопросы и убедимся, что ретрит вам подходит',
    Icon: Phone,
  },
  {
    number: '03',
    title: 'Приезжайте',
    description: 'Бронируете за €100, остаток — за 14 дней до начала',
    Icon: Plane,
  },
  {
    number: '04',
    title: 'Проживайте',
    description: '4 дня движения, дыхания и звука в безопасном пространстве',
    Icon: Heart,
  },
]

export default function ProcessSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-16 text-center">
          Как это работает
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <step.Icon className="w-7 h-7 text-purple-600" />
              </div>
              <span className="text-purple-400 text-sm font-semibold tracking-wider">{step.number}</span>
              <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
