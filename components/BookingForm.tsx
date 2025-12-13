'use client'

import React, { useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';

interface BookingFormProps {
  scores: Record<number, number>;
  avgScore: string;
  onBack: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ scores, avgScore, onBack }) => {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

  // Загружаем Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад к результатам
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <Calendar className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Запишитесь на бесплатную сессию
        </h2>
        <p className="text-gray-600 mb-4">
          30-минутная консультация с Джаханом для разбора ваших результатов
        </p>
        <div className="inline-block bg-purple-100 px-4 py-2 rounded-full">
          <p className="text-sm text-purple-700">
            Ваш результат: <strong>{avgScore}/10</strong>
          </p>
        </div>
      </div>

      {/* Calendly Inline Widget */}
      {calendlyUrl ? (
        <div
          className="calendly-inline-widget bg-white rounded-xl shadow-lg overflow-hidden"
          data-url={`${calendlyUrl}?hide_gdpr_banner=1&background_color=ffffff&text_color=1f2937&primary_color=8b5cf6`}
          style={{ minWidth: '320px', height: '700px' }}
        />
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-800">
            <strong>Calendly не настроен.</strong> Свяжитесь с нами напрямую для записи на сессию.
          </p>
        </div>
      )}

      {/* What to expect */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h3 className="font-bold text-lg mb-3 text-gray-800">Что будет на сессии:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-500">✓</span>
            Разбор вашей карты телесных блоков
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">✓</span>
            Выявление ключевых зон для работы
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">✓</span>
            Персональные рекомендации по практикам
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">✓</span>
            Ответы на ваши вопросы
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookingForm;
