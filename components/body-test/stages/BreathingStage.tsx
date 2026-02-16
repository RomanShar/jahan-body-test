import React from 'react';

interface BreathingStageProps {
  breathCount: number;
}

const BreathingStage: React.FC<BreathingStageProps> = ({ breathCount }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg min-h-96 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Настройка: Войдите в состояние присутствия
      </h2>

      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">
          Устройтесь комфортно. Закройте глаза после прочтения.
        </p>
        <p className="text-lg text-gray-700 font-medium">
          Глубокий вдох через нос...
        </p>
        <p className="text-lg text-gray-700 font-medium mt-2">
          Медленный выдох через рот...
        </p>
      </div>

      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center animate-pulse shadow-lg">
        <span className="text-white text-5xl font-bold">{breathCount || '♡'}</span>
      </div>

      <p className="text-gray-500 mt-8 text-sm text-center">
        Продолжайте дышать глубоко и спокойно...
      </p>
    </div>
  );
};

export default BreathingStage;
