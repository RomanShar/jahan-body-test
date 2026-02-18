import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Суперблизость',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-purple-600 hover:text-purple-700 text-sm mb-8 inline-block"
        >
          &larr; На главную
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>
            Настоящая политика описывает, как мы собираем, используем и защищаем ваши персональные данные
            на сайте «Суперблизость».
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8">Какие данные мы собираем</h2>
          <p>
            При заполнении формы заявки мы собираем: имя, email, телефон (необязательно),
            предпочитаемый тип комнаты и мотивацию участия (необязательно).
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8">Как мы используем данные</h2>
          <p>
            Ваши данные используются исключительно для обработки заявки на участие в ретрите:
            связаться с вами, провести интервью и организовать бронирование.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8">Хранение данных</h2>
          <p>
            Данные хранятся на серверах Supabase (EU) и защищены шифрованием.
            Мы не передаём данные третьим лицам и не используем их в маркетинговых целях
            без вашего согласия.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8">Ваши права</h2>
          <p>
            Вы можете запросить удаление ваших данных в любой момент, написав нам на email.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8">Контакт</h2>
          <p>
            По вопросам конфиденциальности пишите на email, указанный в подвале сайта.
          </p>
        </div>
      </div>
    </main>
  )
}
