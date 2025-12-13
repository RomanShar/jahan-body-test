import React, { useState, useRef, useEffect } from 'react';
import { Heart, Brain, Wind, Zap, Droplets, Footprints, CheckCircle, Play, Pause, Volume2, RotateCcw, ChevronRight } from 'lucide-react';

const BodyAwarenessTest = () => {
  const [stage, setStage] = useState('intro');
  const [currentZone, setCurrentZone] = useState(0);
  const [scores, setScores] = useState({});
  const [breathCount, setBreathCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedScore, setSelectedScore] = useState(null);
  const audioRef = useRef(null);

  const zones = [
    {
      name: 'Голова и лицо',
      icon: Brain,
      color: 'purple',
      description: 'Ментальный центр, мысли, контроль',
      audioUrl: 'https://portuguesemigrantus1986-collab.github.io/meditation-audio/head.MP3',
      audioTime: '~1 минута',
      scaleGuide: {
        low: 'Сильное напряжение, зажатая челюсть, невозможность расслабить лоб',
        mid: 'Небольшое напряжение, иногда чувствую расслабленность',
        high: 'Полная расслабленность, мягкое лицо, свободные мысли'
      },
      blockages: 'Перемышление, контроль, ментальные блоки',
      practice: 'Мягкий массаж лица, осознанное расслабление челюсти, медитация наблюдения'
    },
    {
      name: 'Горло и шея',
      icon: Wind,
      color: 'blue',
      description: 'Центр выражения и коммуникации',
      audioUrl: 'https://portuguesemigrantus1986-collab.github.io/meditation-audio/throat.MP3',
      audioTime: '~45 секунд',
      scaleGuide: {
        low: 'Комок в горле, жесткая шея, невозможность свободно поворачивать голову',
        mid: 'Есть некоторая скованность, но могу расслабить с усилием',
        high: 'Горло свободно, шея подвижна, голос звучит естественно'
      },
      blockages: 'Невысказанность, подавленные эмоции, страх самовыражения',
      practice: 'Голосовые практики, пение, говорение правды, растяжка шеи'
    },
    {
      name: 'Грудь и сердце',
      icon: Heart,
      color: 'green',
      description: 'Эмоциональный центр, любовь, связь',
      audioUrl: 'https://portuguesemigrantus1986-collab.github.io/meditation-audio/chest.MP3',
      audioTime: '~2 минуты',
      scaleGuide: {
        low: 'Тяжесть на груди, поверхностное дыхание, закрытость',
        mid: 'Могу дышать глубже с усилием, иногда чувствую открытость',
        high: 'Легкость в груди, полное дыхание, чувствую связь с эмоциями'
      },
      blockages: 'Закрытость, страх близости, старые раны',
      practice: 'Раскрывающие асаны, обнимания, практики самопринятия'
    },
    {
      name: 'Живот и солнечное сплетение',
      icon: Zap,
      color: 'yellow',
      description: 'Центр силы, воли, действия',
      audioUrl: 'https://portuguesemigrantus1986-collab.github.io/meditation-audio/belly.MP3',
      audioTime: '~30 секунд',
      scaleGuide: {
        low: 'Живот зажат, постоянно втянут, тревога в животе',
        mid: 'Могу расслабить живот, но быстро напрягаю снова',
        high: 'Живот мягкий, дыхание свободно доходит до низа живота'
      },
      blockages: 'Страх действия, низкая самооценка, контроль',
      practice: 'Дыхание животом, динамические практики, укрепление границ'
    },
    {
      name: 'Таз и гениталии',
      icon: Droplets,
      color: 'orange',
      description: 'Сексуальный и творческий центр',
      audioUrl: 'https://portuguesemigrantus1986-collab.github.io/meditation-audio/pelvis.MP3',
      audioTime: '~1.5 минуты',
      scaleGuide: {
        low: 'Стыд, дискомфорт, полное отключение от области',
        mid: 'Могу чувствовать эту зону, но с некоторым напряжением',
        high: 'Комфортная связь с областью, нет стыда, чувствую энергию'
      },
      blockages: 'Стыд, сексуальные табу, подавленная креативность',
      practice: 'Тазовые движения, танец, работа с удовольствием и чувственностью'
    },
    {
      name: 'Ноги и стопы',
      icon: Footprints,
      color: 'red',
      description: 'Центр заземления и базовой безопасности',
      audioUrl: 'https://portuguesemigrantus1986-collab.github.io/meditation-audio/legs.MP3',
      audioTime: '~30 секунд',
      scaleGuide: {
        low: 'Ноги напряжены или онемели, нет чувства опоры',
        mid: 'Частично чувствую ноги, иногда ощущаю устойчивость',
        high: 'Сильное ощущение ног, устойчивость, связь с землей'
      },
      blockages: 'Небезопасность, отсутствие опоры, страх выживания',
      practice: 'Ходьба босиком, приседания, практики заземления'
    }
  ];

  useEffect(() => {
    if (audioRef.current && stage === 'scanning') {
      const audio = audioRef.current;
      
      // Сброс состояния при смене зоны
      setHasListened(false);
      setAudioProgress(0);
      setIsPlaying(false);
      setCurrentTime(0);
      
      const updateProgress = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          const progress = (audio.currentTime / audio.duration) * 100;
          setAudioProgress(progress);
          setCurrentTime(audio.currentTime);
          setAudioDuration(audio.duration);
          
          // Автоматическая разблокировка после 80% прослушивания
          if (progress >= 80) {
            setHasListened(true);
          }
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setHasListened(true);
      };
      
      const handleLoadedMetadata = () => {
        setAudioDuration(audio.duration);
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentZone, stage]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setAudioProgress(0);
      setHasListened(false);
    }
  };

  const startTest = () => {
    setStage('breathing');
    let count = 3;
    const interval = setInterval(() => {
      setBreathCount(count);
      count--;
      if (count < 0) {
        clearInterval(interval);
        setStage('scanning');
        setHasListened(false);
        setAudioProgress(0);
      }
    }, 4000);
  };

  const handleScoreSelect = (score) => {
    setSelectedScore(score);
  };

  const handleScoreConfirm = () => {
    if (selectedScore === null) return;
    
    setScores({...scores, [currentZone]: selectedScore});
    setSelectedScore(null);
    
    // Сброс аудио состояния при переходе
    setHasListened(false);
    setAudioProgress(0);
    setIsPlaying(false);
    
    if (currentZone < zones.length - 1) {
      setCurrentZone(currentZone + 1);
    } else {
      setStage('results');
    }
  };

  const getColorClass = (color, variant = 'bg') => {
    const colors = {
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
    };
    return colors[color][variant];
  };

  const calculateResults = () => {
    const blocked = [];
    const flowing = [];
    const moderate = [];
    
    Object.entries(scores).forEach(([index, score]) => {
      if (score <= 4) blocked.push(parseInt(index));
      else if (score <= 7) moderate.push(parseInt(index));
      else flowing.push(parseInt(index));
    });
    
    return { blocked, moderate, flowing };
  };

  if (stage === 'intro') {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Где блокируются мои желания?
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Этот тест поможет вам распознать зоны тела, где энергия течет свободно, 
          а где встречает препятствия. Через аудио-сканирование и самонаблюдение 
          вы получите персональную карту ваших блоков.
        </p>
        
        <div className="bg-white p-6 rounded-lg mb-6 border-2 border-purple-200">
          <h3 className="font-semibold text-lg mb-3">Что вам понадобится:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>10-15 минут без отвлечений</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Наушники для лучшего погружения</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Удобное место сидя или лежа</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Готовность быть честным с собой</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg mb-6 border-l-4 border-amber-400">
          <p className="text-sm text-amber-800">
            <strong>Важно:</strong> В каждой зоне вы услышите аудио-инструкцию для медитативного сканирования. 
            Прослушайте не менее 80% аудио, чтобы разблокировать возможность оценки.
          </p>
        </div>

        <button
          onClick={startTest}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
        >
          Начать тест
        </button>
      </div>
    );
  }

  if (stage === 'breathing') {
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
  }

  if (stage === 'scanning') {
    const zone = zones[currentZone];
    const Icon = zone.icon;
    
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
              style={{width: `${((currentZone + 1) / zones.length) * 100}%`}}
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

        {/* STEP 1: AUDIO INSTRUCTION - ГЛАВНОЕ! */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 mb-6">
          <div className="flex items-start mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Прослушайте аудио-инструкцию</h3>
              <p className="text-sm text-gray-600 mb-4">
                Следуйте голосовым указаниям для медитативного сканирования этой зоны. 
                Длительность: {zone.audioTime}
              </p>
            </div>
          </div>

          {/* Audio Player - Working with Dropbox */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-3">
                🎧 Аудио-инструкция ({zone.audioTime})
              </p>
              
              {/* HTML5 Audio Player with GitHub */}
              <audio
                ref={audioRef}
                controls
                className="w-full"
                style={{height: '40px'}}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={(e) => {
                  console.error('Audio load error:', e);
                  alert('Ошибка загрузки аудио. Попробуйте обновить страницу.');
                }}
                preload="auto"
              >
                <source src={zone.audioUrl} type="audio/mpeg" />
                <source src={zone.audioUrl} type="audio/mp3" />
                Ваш браузер не поддерживает аудио элемент.
              </audio>

              <div className="mt-2 text-xs text-gray-500">
                Если аудио не загружается, <a href={zone.audioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">откройте файл напрямую</a>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex-1">
                  {hasListened ? (
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <span className="text-base">✓</span> Прослушано - оценка разблокирована
                    </span>
                  ) : (
                    <div className="text-gray-600">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-500 h-1.5 rounded-full transition-all"
                            style={{width: `${audioProgress}%`}}
                          />
                        </div>
                        <span className="text-xs font-medium">{Math.round(audioProgress)}%</span>
                      </div>
                      <p className="text-xs">
                        {audioProgress >= 80 
                          ? '✓ Можно переходить к оценке' 
                          : audioProgress > 0
                            ? `Прослушайте ещё ${Math.max(0, 80 - Math.round(audioProgress))}% для разблокировки`
                            : 'Нажмите ▶️ Play для начала прослушивания'}
                      </p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={restartAudio}
                  className="ml-3 text-purple-600 hover:text-purple-700 font-medium text-sm px-2 py-1 rounded hover:bg-purple-50"
                  title="Начать заново"
                >
                  🔄 Заново
                </button>
              </div>
            </div>
          </div>

          {!hasListened && (
            <div className="mt-4 bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
              <p className="text-sm text-purple-800">
                <strong>⏳ Внимание:</strong> Кнопки оценки разблокируются после прослушивания 80% аудио-инструкции. 
                Это важно для точной оценки своих ощущений.
              </p>
              <button
                onClick={() => setHasListened(true)}
                className="mt-2 text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                🔓 Временно разблокировать (для теста)
              </button>
            </div>
          )}
        </div>

        {/* STEP 2: SELF-ASSESSMENT */}
        <div className={`bg-white p-6 rounded-xl border-2 ${hasListened ? 'border-green-200' : 'border-gray-200 opacity-50'} mb-6 transition-all`}>
          <div className="flex items-start mb-4">
            <div className={`${hasListened ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 transition-all`}>
              2
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Оцените свои ощущения</h3>
              <p className="text-sm text-gray-600 mb-4">
                Насколько свободно и расслабленно чувствуется эта зона? Выберите число от 1 до 10
              </p>
            </div>
          </div>

          {/* Scale Guide */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-bold text-red-600 flex-shrink-0">1-4:</span>
              <span className="text-gray-700">{zone.scaleGuide.low}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-yellow-600 flex-shrink-0">5-7:</span>
              <span className="text-gray-700">{zone.scaleGuide.mid}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600 flex-shrink-0">8-10:</span>
              <span className="text-gray-700">{zone.scaleGuide.high}</span>
            </div>
          </div>

          {/* Score Buttons */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <button
                key={num}
                onClick={() => handleScoreSelect(num)}
                disabled={!hasListened}
                className={`
                  py-3 rounded-lg font-bold text-lg transition-all
                  ${selectedScore === num 
                    ? `${getColorClass(zone.color)} text-white shadow-lg scale-110` 
                    : hasListened 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105' 
                      : 'bg-gray-50 text-gray-300 cursor-not-allowed'}
                  ${!hasListened ? 'opacity-40' : ''}
                `}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={handleScoreConfirm}
            disabled={selectedScore === null}
            className={`
              w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
              ${selectedScore !== null
                ? `${getColorClass(zone.color)} text-white hover:opacity-90 shadow-lg`
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            {currentZone < zones.length - 1 ? 'Следующая зона' : 'Показать результаты'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Breathing Reminder */}
        <div className="text-center text-sm text-gray-500 mt-6">
          💨 Не забывайте глубоко дышать во время практики
        </div>
      </div>
    );
  }

  if (stage === 'results') {
    const { blocked, moderate, flowing } = calculateResults();
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const avgScore = (totalScore / zones.length).toFixed(1);

    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Ваша карта телесной осознанности
          </h2>
          <div className="inline-block bg-purple-100 px-6 py-3 rounded-full">
            <p className="text-gray-600">
              Общий уровень свободы энергии: <span className="font-bold text-2xl text-purple-600">{avgScore}/10</span>
            </p>
          </div>
        </div>

        {/* Interpretation */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-6 border-2 border-purple-200">
          <h3 className="font-bold text-xl mb-3">📊 Интерпретация результата:</h3>
          <p className="text-gray-700 leading-relaxed">
            {avgScore >= 8 && "Отличный результат! Вы обладаете высоким уровнем телесной осознанности. Продолжайте практику для поддержания этого состояния."}
            {avgScore >= 6 && avgScore < 8 && "Хороший результат! У вас есть базовая связь с телом, но есть зоны, требующие внимания. Регулярная практика поможет углубить осознанность."}
            {avgScore >= 4 && avgScore < 6 && "Средний результат. Многие зоны находятся в состоянии умеренного блока. Это нормально для начинающих. Фокусируйтесь на практиках для проблемных зон."}
            {avgScore < 4 && "Вы находитесь в начале пути осознанности тела. Не переживайте - осознание блоков уже первый шаг к их раскрытию. Начните с ежедневной 10-минутной практики."}
          </p>
        </div>

        {/* Flowing Zones */}
        {flowing.length > 0 && (
          <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 mb-6">
            <h3 className="font-bold text-xl text-green-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span> Зоны свободного течения
            </h3>
            <div className="grid gap-3">
              {flowing.map(idx => {
                const zone = zones[idx];
                const Icon = zone.icon;
                return (
                  <div key={idx} className="bg-white p-4 rounded-lg flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${getColorClass(zone.color, 'text')}`} />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{zone.name}</p>
                      <p className="text-sm text-gray-600">Оценка: {scores[idx]}/10</p>
                    </div>
                    <div className="text-2xl">💚</div>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-green-700 mt-4 bg-green-100 p-3 rounded-lg">
              💡 <strong>Ваши ресурсы:</strong> Используйте энергию этих зон для поддержки работы с заблокированными областями.
            </p>
          </div>
        )}

        {/* Moderate Zones */}
        {moderate.length > 0 && (
          <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 mb-6">
            <h3 className="font-bold text-xl text-yellow-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Зоны умеренного напряжения
            </h3>
            <div className="grid gap-3">
              {moderate.map(idx => {
                const zone = zones[idx];
                const Icon = zone.icon;
                return (
                  <div key={idx} className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-6 h-6 ${getColorClass(zone.color, 'text')}`} />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{zone.name}</p>
                        <p className="text-sm text-gray-600">Оценка: {scores[idx]}/10</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Рекомендация:</strong> {zone.practice}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Blocked Zones */}
        {blocked.length > 0 && (
          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200 mb-6">
            <h3 className="font-bold text-xl text-red-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔒</span> Зоны, требующие особого внимания
            </h3>
            <div className="grid gap-4">
              {blocked.map(idx => {
                const zone = zones[idx];
                const Icon = zone.icon;
                return (
                  <div key={idx} className="bg-white p-5 rounded-lg border-l-4 border-red-400">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className={`w-7 h-7 ${getColorClass(zone.color, 'text')} mt-1`} />
                      <div className="flex-1">
                        <p className="font-bold text-lg text-gray-800">{zone.name}</p>
                        <p className="text-sm text-gray-600 mb-2">Оценка: {scores[idx]}/10 - Сильный блок</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        <strong className="text-red-700">Возможные причины:</strong> {zone.blockages}
                      </p>
                      <p className="text-gray-700">
                        <strong className="text-green-700">Начните с:</strong> {zone.practice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 bg-red-100 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>⚠️ Важно:</strong> Если блоки связаны с травмами (особенно в зонах сердца и таза), 
                рекомендуем работу с телесно-ориентированным терапевтом или специалистом по соматике.
              </p>
            </div>
          </div>
        )}

        {/* Full Map */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 mb-6 shadow-sm">
          <h3 className="font-bold text-xl mb-4">📋 Полная карта вашего тела</h3>
          <div className="space-y-3">
            {zones.map((zone, idx) => {
              const score = scores[idx];
              const percentage = (score / 10) * 100;
              const Icon = zone.icon;
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-800">{zone.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{score}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        score <= 4 ? 'bg-red-400' : score <= 7 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{width: `${percentage}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 mb-6">
          <h3 className="font-bold text-xl mb-4">🎯 Ваш персональный план действий</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <p><strong>Ежедневная практика:</strong> 10-15 минут сканирования тела с дыханием (можно использовать этот тест как медитацию)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <p><strong>Приоритет:</strong> Начните работу с {blocked.length > 0 ? 'самой заблокированной зоны' : moderate.length > 0 ? 'зон умеренного напряжения' : 'поддержания текущего уровня осознанности'}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <p><strong>Отслеживание:</strong> Проходите тест раз в неделю, чтобы видеть прогресс</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <p><strong>Терпение:</strong> Блоки формировались годами - дайте себе минимум 4-6 недель регулярной практики</p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
          <h3 className="font-bold text-xl mb-3">📚 Дополнительные ресурсы</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Книги:</strong> "Тело помнит все" (Бессел ван дер Колк), "Осознанное тело" (Джудит Блэкстоун)</li>
            <li>• <strong>Практики:</strong> Йога, цигун, танцевально-двигательная терапия, соматика</li>
            <li>• <strong>Специалисты:</strong> Телесно-ориентированный психотерапевт, инструктор по embodiment практикам</li>
          </ul>
        </div>

        <button
          onClick={() => {
            setStage('intro');
            setCurrentZone(0);
            setScores({});
            setSelectedScore(null);
            setHasListened(false);
            setAudioProgress(0);
          }}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
        >
          Пройти тест заново
        </button>
      </div>
    );
  }
};

export default BodyAwarenessTest;