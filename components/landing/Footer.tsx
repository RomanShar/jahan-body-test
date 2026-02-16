import Link from 'next/link'
import { navItems, contact } from './constants'

export default function Footer() {
  return (
    <footer className="bg-brand-dark py-12 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Безопасно быть близко</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Телесный ретрит в Португалии
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white transition text-sm"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/test"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Тест тела
            </Link>
          </nav>

          {/* Contact */}
          <div className="flex gap-4">
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Telegram
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Email
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Безопасно быть близко. Все права защищены.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-400 transition">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
