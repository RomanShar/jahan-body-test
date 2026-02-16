import React from 'react';
import { CheckCircle, TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import type { TestResult, ProgressComparison, DimensionKey } from '../types';
import { zones, dimensionLabels, dimensionInterpretations, patternInterpretations, profileInterpretations } from '../constants';
import { getZoneAverage } from '../analysis';
import { getColorClass, getScaleColor } from '../utils';
import BookingForm from '../BookingForm';

interface ResultsStageProps {
  testResult: TestResult;
  progressComparison: ProgressComparison | null;
  onReset: () => void;
}

const ResultsStage: React.FC<ResultsStageProps> = ({ testResult, progressComparison, onReset }) => {
  const [showBookingForm, setShowBookingForm] = React.useState(false);
  const { analysis } = testResult;
  const profile = profileInterpretations[analysis.profileType];

  if (showBookingForm) {
    return (
      <BookingForm
        scores={Object.fromEntries(
          Object.entries(testResult.zoneScores).map(([zoneId, scores]) => {
            const zoneIndex = zones.findIndex(z => z.id === zoneId);
            return [zoneIndex, Math.round(getZoneAverage(scores) * 2)];
          })
        )}
        avgScore={(Object.values(testResult.zoneScores).reduce((sum, s) => sum + getZoneAverage(s), 0) / zones.length * 2).toFixed(1)}
        onBack={() => setShowBookingForm(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Ваша карта телесной осознанности
        </h2>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{profile.emoji}</span>
          <div>
            <h3 className="text-2xl font-bold text-purple-800">{profile.title}</h3>
            <p className="text-purple-600">
              {analysis.blockedCount} из 6 зон заблокировано
            </p>
          </div>
        </div>
        <p className="text-gray-700">{profile.description}</p>
      </div>

      {/* Progress Comparison */}
      {progressComparison && (
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
          <h3 className="font-bold text-xl text-blue-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Сравнение с прошлым тестом
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            Предыдущий тест: {new Date(progressComparison.previousDate).toLocaleDateString('ru-RU')}
          </p>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-gray-700">Изменение блоков:</span>
            <span className={`font-bold flex items-center gap-1 ${
              progressComparison.blockedCountChange < 0
                ? 'text-green-600'
                : progressComparison.blockedCountChange > 0
                  ? 'text-red-600'
                  : 'text-gray-600'
            }`}>
              {progressComparison.blockedCountChange < 0 ? (
                <><TrendingDown className="w-5 h-5" /> {progressComparison.blockedCountChange}</>
              ) : progressComparison.blockedCountChange > 0 ? (
                <><TrendingUp className="w-5 h-5" /> +{progressComparison.blockedCountChange}</>
              ) : (
                <><Minus className="w-5 h-5" /> Без изменений</>
              )}
            </span>
          </div>

          {progressComparison.improvedZones.length > 0 && (
            <p className="text-sm text-green-700">
              <strong>Улучшились:</strong> {progressComparison.improvedZones.map(id => zones.find(z => z.id === id)?.name).join(', ')}
            </p>
          )}
          {progressComparison.worsenedZones.length > 0 && (
            <p className="text-sm text-red-700">
              <strong>Ухудшились:</strong> {progressComparison.worsenedZones.map(id => zones.find(z => z.id === id)?.name).join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Pattern Analysis */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-6 border-2 border-purple-200">
        <h3 className="font-bold text-xl mb-3">🔍 Паттерн тела:</h3>
        <p className="text-gray-700 leading-relaxed">
          {patternInterpretations[analysis.pattern]}
        </p>
      </div>

      {/* Weakest Dimension */}
      <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200 mb-6">
        <h3 className="font-bold text-xl text-amber-800 mb-3">
          ⚠️ Слабейшее измерение: {dimensionLabels[analysis.weakestDimension]}
        </h3>
        <p className="text-gray-700">
          {dimensionInterpretations[analysis.weakestDimension]}
        </p>
      </div>

      {/* Retreat CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl mb-6 text-white shadow-lg">
        <h3 className="font-bold text-2xl mb-3">
          {analysis.profileType === 'severe_blocks' || analysis.profileType === 'significant_blocks'
            ? 'Именно для таких результатов создан ретрит Джахан'
            : analysis.profileType === 'light_blocks'
              ? 'Ретрит поможет раскрыть оставшиеся блоки'
              : 'Ретрит углубит вашу практику'}
        </h3>
        <p className="mb-4 opacity-90">
          3-дневный соматический ретрит в Португалии. Дыхание, движение, звук — работа через тело, не через голову. Малая группа до 12 человек.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/#retreat"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition shadow-md text-center"
          >
            Узнать о ретрите
          </a>
          <button
            onClick={() => setShowBookingForm(true)}
            className="border-2 border-white/40 text-white px-8 py-3 rounded-lg font-bold hover:border-white hover:bg-white/10 transition text-center"
          >
            Бесплатная консультация
          </button>
        </div>
      </div>

      {/* Zones by Status */}
      {analysis.blockedZones.length > 0 && (
        <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200 mb-6">
          <h3 className="font-bold text-xl text-red-800 mb-4">
            🔒 Заблокированные зоны ({analysis.blockedZones.length})
          </h3>
          <div className="grid gap-4">
            {analysis.blockedZones.map(zoneId => {
              const z = zones.find(zone => zone.id === zoneId)!;
              const scores = testResult.zoneScores[zoneId];
              const ZoneIcon = z.icon;
              return (
                <div key={zoneId} className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                  <div className="flex items-start gap-3 mb-3">
                    <ZoneIcon className={`w-6 h-6 ${getColorClass(z.color, 'text')}`} />
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{z.name}</p>
                      <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
                        {(['awareness', 'tension', 'emotional', 'control'] as DimensionKey[]).map(key => (
                          <div key={key} className="text-center">
                            <div className={`${getScaleColor(scores[key])} text-white rounded px-2 py-1`}>
                              {scores[key]}
                            </div>
                            <div className="text-gray-500 mt-1 text-xs">{dimensionLabels[key]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-700">Рекомендация:</strong> {z.practice}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {analysis.tensionZones.length > 0 && (
        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 mb-6">
          <h3 className="font-bold text-xl text-yellow-800 mb-4">
            ⚡ Зоны напряжения ({analysis.tensionZones.length})
          </h3>
          <div className="grid gap-3">
            {analysis.tensionZones.map(zoneId => {
              const z = zones.find(zone => zone.id === zoneId)!;
              const scores = testResult.zoneScores[zoneId];
              const ZoneIcon = z.icon;
              return (
                <div key={zoneId} className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ZoneIcon className={`w-6 h-6 ${getColorClass(z.color, 'text')}`} />
                    <p className="font-semibold text-gray-800 flex-1">{z.name}</p>
                    <div className="flex gap-1">
                      {(['awareness', 'tension', 'emotional', 'control'] as DimensionKey[]).map(key => (
                        <div key={key} className={`${getScaleColor(scores[key])} text-white text-xs rounded px-2 py-1`}>
                          {scores[key]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {analysis.freeZones.length > 0 && (
        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 mb-6">
          <h3 className="font-bold text-xl text-green-800 mb-4">
            ✨ Свободные зоны ({analysis.freeZones.length})
          </h3>
          <div className="grid gap-3">
            {analysis.freeZones.map(zoneId => {
              const z = zones.find(zone => zone.id === zoneId)!;
              const scores = testResult.zoneScores[zoneId];
              const ZoneIcon = z.icon;
              return (
                <div key={zoneId} className="bg-white p-4 rounded-lg flex items-center gap-3">
                  <ZoneIcon className={`w-6 h-6 ${getColorClass(z.color, 'text')}`} />
                  <p className="font-semibold text-gray-800 flex-1">{z.name}</p>
                  <div className="flex gap-1">
                    {(['awareness', 'tension', 'emotional', 'control'] as DimensionKey[]).map(key => (
                      <div key={key} className={`${getScaleColor(scores[key])} text-white text-xs rounded px-2 py-1`}>
                        {scores[key]}
                      </div>
                    ))}
                  </div>
                  <span className="text-2xl">💚</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Second CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl mb-6 text-white shadow-lg text-center">
        <p className="mb-4 text-lg">Готовы проработать блоки глубже?</p>
        <a
          href="/#pricing"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition shadow-md"
        >
          Забронировать место на ретрите
        </a>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Пройти тест заново
      </button>
    </div>
  );
};

export default ResultsStage;
