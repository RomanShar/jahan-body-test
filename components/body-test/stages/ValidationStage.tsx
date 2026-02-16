import React from 'react';
import type { Zone } from '../types';
import { getColorClass } from '../utils';

interface ValidationStageProps {
  zone: Zone;
  onAnswer: (focused: boolean) => void;
}

const ValidationStage: React.FC<ValidationStageProps> = ({ zone, onAnswer }) => {
  const Icon = zone.icon;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <div className={`${getColorClass(zone.color, 'light')} p-6 rounded-xl border-2 ${getColorClass(zone.color, 'border')} mb-6`}>
        <div className="flex items-center mb-3">
          <div className={`${getColorClass(zone.color)} p-3 rounded-lg mr-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{zone.name}</h2>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-300 mb-6">
        <h3 className="font-bold text-xl text-amber-800 mb-4">
          Удалось ли вам сфокусироваться на ощущениях в этой зоне?
        </h3>
        <p className="text-sm text-amber-700 mb-6">
          Это важно для точности оценки. Ваш ответ сохраняется для анализа качества данных.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => onAnswer(true)}
            className="flex-1 bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition shadow-md"
          >
            Да, удалось
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="flex-1 bg-amber-500 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition shadow-md"
          >
            Было сложно
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationStage;
