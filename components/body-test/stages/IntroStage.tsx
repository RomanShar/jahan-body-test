import React from 'react';
import { getTestHistory } from '../storage';

interface IntroStageProps {
  onStart: () => void;
}

const IntroStage: React.FC<IntroStageProps> = ({ onStart }) => {
  const history = getTestHistory();

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        Где блокируются мои желания?
      </h1>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Этот тест поможет вам распознать зоны тела, где энергия течёт свободно,
        а где встречает препятствия. Через аудио-сканирование и самонаблюдение
        вы получите персональную карту ваших блоков.
      </p>

      {history.results.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border-2 border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>📊 История:</strong> Вы уже проходили тест {history.results.length} раз(а).
            Последний раз: {new Date(history.lastTestDate).toLocaleDateString('ru-RU')}
          </p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg mb-6 border-2 border-purple-200">
        <h3 className="font-semibold text-lg mb-3">Что вам понадобится:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">✓</span>
            <span>15-20 минут без отвлечений</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">✓</span>
            <span>Наушники для лучшего погружения</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">✓</span>
            <span>Удобное место сидя или лёжа</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">✓</span>
            <span>Готовность быть честным с собой</span>
          </li>
        </ul>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg mb-6 border-l-4 border-amber-400">
        <p className="text-sm text-amber-800">
          <strong>Важно:</strong> В каждой зоне вы ответите на 4 вопроса по разным измерениям:
          осознание, напряжение, эмоциональная связь и управление.
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
      >
        Начать тест
      </button>
    </div>
  );
};

export default IntroStage;
