'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { pricing, contact } from './constants'
import { saveLead } from '@/lib/supabase'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [telegram, setTelegram] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const lastSubmitRef = useRef(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setName('')
      setEmail('')
      setPhone('')
      setTelegram('')
      setSubmitted(false)
      setError('')
      setConsent(false)
      setHoneypot('')
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return

    const errors: Record<string, string> = {}
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Укажите имя (минимум 2 символа)'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Введите корректный email'
    }
    if (!phone.trim()) {
      errors.phone = 'Укажите телефон или WhatsApp'
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(phone.trim())) {
      errors.phone = 'Проверьте формат телефона'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    const now = Date.now()
    if (now - lastSubmitRef.current < 5000) {
      setError('Подождите несколько секунд перед повторной отправкой')
      return
    }
    lastSubmitRef.current = now

    setFieldErrors({})
    setError('')
    setSubmitting(true)

    try {
      await saveLead({
        name: trimmedName,
        email: trimmedEmail,
        phone: phone.trim() || undefined,
        telegram: telegram.trim() || undefined,
      })
      setSubmitted(true)
    } catch {
      setError('network')
    } finally {
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (submitted) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title-success"
      >
        <div ref={modalRef} className="bg-brand-body p-8 sm:p-10 max-w-md w-full relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brand-light hover:text-brand-dark transition"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-brand-sage/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-brand-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 id="modal-title-success" className="font-serif text-2xl text-brand-dark mb-3">Спасибо за заявку!</h3>
          <p className="text-brand-muted mb-6">
            Мы свяжемся с вами в течение 24 часов для короткого интервью.
          </p>
          <button
            onClick={onClose}
            className="bg-brand-clay text-white px-8 py-3 text-[13px] uppercase tracking-wider font-medium hover:bg-brand-clay-hover transition-all"
          >
            Отлично
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={modalRef} className="bg-brand-body p-8 sm:p-10 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brand-light hover:text-brand-dark transition"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 id="modal-title" className="font-serif text-2xl text-brand-dark mb-2">Оставить заявку</h3>
        <p className="text-brand-light text-sm mb-6">
          {pricing.dates}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="app-name" className="block text-sm text-brand-muted mb-1">
              Имя
            </label>
            <input
              ref={firstInputRef}
              id="app-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-brand-border bg-brand-card text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-clay focus:border-transparent"
              placeholder="Ваше имя"
            />
            {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="app-email" className="block text-sm text-brand-muted mb-1">
              Email
            </label>
            <input
              id="app-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-brand-border bg-brand-card text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-clay focus:border-transparent"
              placeholder="your@email.com"
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="app-phone" className="block text-sm text-brand-muted mb-1">
              Телефон / WhatsApp
            </label>
            <input
              id="app-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-brand-border bg-brand-card text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-clay focus:border-transparent"
              placeholder="+351 ..."
            />
            {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>

          <div>
            <label htmlFor="app-telegram" className="block text-sm text-brand-muted mb-1">
              Telegram <span className="text-brand-light">(необязательно)</span>
            </label>
            <input
              id="app-telegram"
              type="text"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="w-full px-4 py-3 border border-brand-border bg-brand-card text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-clay focus:border-transparent"
              placeholder="@username"
            />
          </div>

          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* GDPR consent */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 text-brand-clay focus:ring-brand-clay"
            />
            <span className="text-brand-muted text-xs leading-relaxed">
              Я согласен(а) на обработку персональных данных в соответствии с{' '}
              <Link href="/privacy" target="_blank" className="text-brand-clay underline underline-offset-4 hover:text-brand-clay-hover">
                политикой конфиденциальности
              </Link>
            </span>
          </label>

          {error && (
            <p className="text-red-500 text-sm">
              Произошла ошибка. Попробуйте ещё раз или{' '}
              <a href={contact.telegram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 font-medium">
                напишите нам в Telegram
              </a>.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-clay text-white py-4 text-[13px] uppercase tracking-wider font-medium hover:bg-brand-clay-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Отправляем...' : 'Отправить заявку'}
          </button>

          <p className="text-brand-light text-xs text-center">
            {pricing.applicationNote}
          </p>
        </form>
      </div>
    </div>
  )
}
