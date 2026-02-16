import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { Zone } from '../types';
import { zones } from '../constants';
import { getColorClass } from '../utils';
import { getAudioUrl } from '@/lib/supabase';

interface ScanningStageProps {
  zone: Zone;
  currentZone: number;
  onContinue: () => void;
}

const ScanningStage: React.FC<ScanningStageProps> = ({ zone, currentZone, onContinue }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const Icon = zone.icon;
  const audioUrl = getAudioUrl(zone.audioFile);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasListened(false);
    setAudioProgress(0);
    setIsPlaying(false);

    const updateProgress = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
        if (progress >= 80) {
          setHasListened(true);
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasListened(true);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentZone]);

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setAudioProgress(0);
      setHasListened(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 font-medium">
            Зона {currentZone + 1} из {zones.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentZone + 1) / zones.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getColorClass(zone.color)} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${((currentZone + 1) / zones.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Zone Header */}
      <div className={`${getColorClass(zone.color, 'light')} p-6 rounded-xl border-2 ${getColorClass(zone.color, 'border')} mb-6`}>
        <div className="flex items-center mb-3">
          <div className={`${getColorClass(zone.color)} p-3 rounded-lg mr-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{zone.name}</h2>
            <p className={`text-sm ${getColorClass(zone.color, 'text')}`}>{zone.description}</p>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800">
          Шаг 1: Прослушайте аудио-инструкцию
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Следуйте голосовым указаниям для медитативного сканирования этой зоны.
          Длительность: {zone.audioTime}
        </p>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <audio
            ref={audioRef}
            controls
            className="w-full"
            style={{ height: '40px' }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="auto"
            key={zone.audioFile}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Ваш браузер не поддерживает аудио элемент.
          </audio>

          <div className="flex items-center justify-between mt-3 text-xs">
            <div className="flex-1">
              {hasListened ? (
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <span className="text-base">✓</span> Прослушано — можно продолжить
                </span>
              ) : (
                <div className="text-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-purple-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{Math.round(audioProgress)}%</span>
                  </div>
                  <p className="text-xs">
                    {audioProgress >= 80
                      ? '✓ Можно продолжить'
                      : 'Прослушайте аудио для продолжения'}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={restartAudio}
              className="ml-3 text-purple-600 hover:text-purple-700 font-medium text-sm px-2 py-1 rounded hover:bg-purple-50"
            >
              🔄 Заново
            </button>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={!hasListened}
        className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
          ${hasListened
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        Продолжить к оценке
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="text-center text-sm text-gray-500 mt-6">
        💨 Не забывайте глубоко дышать во время практики
      </div>
    </div>
  );
};

export default ScanningStage;
