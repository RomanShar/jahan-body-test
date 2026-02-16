'use client'

import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { pricingTiers, pricing } from './constants'
import { saveLead } from '@/lib/supabase'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedTier, setSelectedTier] = useState(pricingTiers[1].name)
  const [motivation, setMotivation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('')
      setEmail('')
      setPhone('')
      setSelectedTier(pricingTiers[1].name)
      setMotivation('')
      setSubmitted(false)
      setError('')
    }
  }, [isOpen])

  // Escape key handler
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await saveLead({
        name,
        email,
        phone: phone || undefined,
        room_preference: selectedTier,
        motivation: motivation || undefined,
      })
      setSubmitted(true)
    } catch {
      setError('Произошла ошибка. Попробуйте ещё раз или напишите нам в Telegram.')
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
      >
        <div className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-3">Спасибо за заявку!</h3>
          <p className="text-gray-600 mb-6">
            Мы свяжемся с вами в течение 24 часов для короткого интервью.
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
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
    >
      <div className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">Оставить заявку</h3>
        <p className="text-gray-500 text-sm mb-6">
          {pricing.dates} &middot; до {pricing.groupSize} участников
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="app-name" className="block text-sm font-medium text-gray-700 mb-1">
              Имя
            </label>
            <input
              id="app-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="Ваше имя"
            />
          </div>

          <div>
            <label htmlFor="app-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="app-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="app-phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон / WhatsApp <span className="text-gray-500">(необязательно)</span>
            </label>
            <input
              id="app-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="+351 ..."
            />
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 mb-3">Предпочитаемая комната</p>
            <div className="space-y-2">
              {pricingTiers.map((tier) => (
                <label
                  key={tier.name}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    selectedTier === tier.name
                      ? 'border-purple-400 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={tier.name}
                    checked={selectedTier === tier.name}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="text-purple-500 focus:ring-purple-400"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 text-sm">{tier.name}</span>
                    <span className="text-gray-500 text-xs ml-2">{tier.description}</span>
                  </div>
                  <span className="text-purple-600 font-medium text-sm">{tier.price} {pricing.currency}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="app-motivation" className="block text-sm font-medium text-gray-700 mb-1">
              Почему хотите участвовать? <span className="text-gray-500">(необязательно)</span>
            </label>
            <textarea
              id="app-motivation"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
              placeholder="Расскажите немного о себе..."
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Отправляем...' : 'Оставить заявку'}
          </button>

          <p className="text-gray-500 text-xs text-center">
            {pricing.applicationNote}
          </p>
        </form>
      </div>
    </div>
  )
}
