import Link from 'next/link'
import { navItems, contact } from './constants'

export default function Footer() {
  return (
    <footer className="bg-brand-body py-12 pb-24 md:pb-12 px-6 border-t border-brand-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Суперблизость</h3>
            <p className="text-brand-light text-sm max-w-xs">
              Телесный тренинг в Пенише, Португалия
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-brand-muted hover:text-brand-dark transition text-sm py-2 px-1"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/test"
              className="text-brand-muted hover:text-brand-dark transition text-sm py-2 px-1"
            >
              Тест тела
            </Link>
          </nav>

          {/* Contact */}
          <div className="flex gap-4">
            <a
              href={contact.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-muted hover:text-brand-dark transition text-sm py-2 px-1"
            >
              Telegram-канал
            </a>
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-muted hover:text-brand-dark transition text-sm py-2 px-1"
            >
              Telegram
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-muted hover:text-brand-dark transition text-sm py-2 px-1"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-brand-muted hover:text-brand-dark transition text-sm py-2 px-1"
            >
              Email
            </a>
          </div>
        </div>

        <div className="border-t border-brand-border pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-brand-light text-sm">
              &copy; {new Date().getFullYear()} Суперблизость. Все права защищены.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="text-brand-light hover:text-brand-muted transition">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
          <p className="text-brand-light text-xs mt-6 text-center max-w-lg mx-auto">
            Тренинг не является медицинской диагностикой. Для медицинских вопросов обратитесь к врачу.
          </p>
        </div>
      </div>
    </footer>
  )
}
