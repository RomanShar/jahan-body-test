'use client'

import { useState } from 'react'
import { Shield, Waves, Sunrise, Star, ChevronDown } from 'lucide-react'
import { retreatSection, retreatDays, practices, retreatSafety } from './constants'

const dayIcons = [Shield, Waves, Sunrise, Star]

export default function RetreatSection() {
  const [activeDay, setActiveDay] = useState(0)
  const [safetyOpen, setSafetyOpen] = useState(false)

  return (
    <section id="retreat" className="bg-white py-20 sm:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          {retreatSection.headline}
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          {retreatSection.location}. {retreatSection.locationDescription}
        </p>

        {/* Format metric */}
        <div className="flex justify-center mb-10">
          <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
            85% практика · 15% теория
          </span>
        </div>

        {/* Day selector */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-10 justify-center">
          {retreatDays.map((day, index) => {
            const Icon = dayIcons[index]
            return (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                  activeDay === index
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">День {day.day}:</span>
                <span>{day.title}</span>
              </button>
            )
          })}
        </div>

        {/* Day content */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            День {retreatDays[activeDay].day}: {retreatDays[activeDay].title}
          </h3>
          <p className="text-purple-600 font-medium mb-6 text-lg">
            {retreatDays[activeDay].subtitle}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            {retreatDays[activeDay].description}
          </p>

          {retreatDays[activeDay].emotionalArc && (
            <p className="text-purple-500/80 italic text-sm leading-relaxed mb-8">
              {retreatDays[activeDay].emotionalArc}
            </p>
          )}

          {/* Schedule */}
          {retreatDays[activeDay].schedule && (
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Ритм дня</h4>
              <div className="space-y-2">
                {retreatDays[activeDay].schedule!.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {retreatDays[activeDay].practices.map((practice, i) => (
              <span
                key={i}
                className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {practice}
              </span>
            ))}
          </div>
        </div>

        {/* Practices grid */}
        <div id="program">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Что вас ждёт
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practices.map((practice, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-purple-200 transition-colors"
              >
                <h4 className="font-bold text-gray-800 mb-2">{practice.name}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & boundaries (collapsible) */}
        <div className="mt-16">
          <button
            onClick={() => setSafetyOpen(!safetyOpen)}
            className="w-full flex items-center justify-between bg-white rounded-xl p-6 border border-gray-100 hover:border-purple-200 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-500" />
              <span className="text-xl font-bold text-gray-800">Безопасность и границы</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                safetyOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              safetyOpen ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
          >
            <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-3">
              {retreatSafety.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
