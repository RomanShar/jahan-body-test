import React from 'react';
import type { Zone, DimensionKey, ZoneScore } from '../types';
import { zones, scaleOptions, dimensionLabels } from '../constants';
import { getColorClass, getScaleColor } from '../utils';

interface RatingStageProps {
  zone: Zone;
  currentZone: number;
  currentDimension: number;
  currentZoneScores: Partial<ZoneScore>;
  onScore: (score: number) => void;
}

const RatingStage: React.FC<RatingStageProps> = ({ zone, currentZone, currentDimension, currentZoneScores, onScore }) => {
  const Icon = zone.icon;
  const dimension = zone.dimensions[currentDimension];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 font-medium">
            Зона {currentZone + 1} / {zones.length} • Вопрос {currentDimension + 1} / 4
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getColorClass(zone.color)} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${((currentZone * 4 + currentDimension + 1) / (zones.length * 4)) * 100}%` }}
          />
        </div>
      </div>

      {/* Zone Header */}
      <div className={`${getColorClass(zone.color, 'light')} p-4 rounded-xl border-2 ${getColorClass(zone.color, 'border')} mb-6`}>
        <div className="flex items-center">
          <div className={`${getColorClass(zone.color)} p-2 rounded-lg mr-3`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{zone.name}</h2>
            <p className={`text-xs ${getColorClass(zone.color, 'text')}`}>
              {dimensionLabels[dimension.key]}
            </p>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-6">
          {dimension.question}
        </h3>

        {/* 5-point Scale */}
        <div className="space-y-3">
          {scaleOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onScore(option.value)}
              className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 hover:scale-[1.02] ${
                currentZoneScores[dimension.key] === option.value
                  ? `${getScaleColor(option.value)} text-white border-transparent`
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                currentZoneScores[dimension.key] === option.value
                  ? 'bg-white/20'
                  : getScaleColor(option.value) + ' text-white'
              }`}>
                {option.value}
              </div>
              <div className="text-left">
                <div className="font-semibold">{option.label}</div>
                <div className={`text-sm ${currentZoneScores[dimension.key] === option.value ? 'text-white/80' : 'text-gray-500'}`}>
                  {option.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current zone progress */}
      <div className="flex gap-2 justify-center mb-4">
        {zone.dimensions.map((d, idx) => (
          <div
            key={d.key}
            className={`w-3 h-3 rounded-full ${
              idx < currentDimension
                ? getScaleColor(currentZoneScores[zone.dimensions[idx].key] || 3)
                : idx === currentDimension
                  ? 'bg-purple-500 animate-pulse'
                  : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        💨 Не забывайте глубоко дышать
      </div>
    </div>
  );
};

export default RatingStage;
