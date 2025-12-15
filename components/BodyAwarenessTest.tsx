'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Heart, Brain, Wind, Zap, Droplets, Footprints, CheckCircle, ChevronRight, TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import BookingForm from './BookingForm';
import { getAudioUrl } from '@/lib/supabase';

// ============ ТИПЫ ============

type DimensionKey = 'awareness' | 'tension' | 'emotional' | 'control';

interface DimensionQuestion {
  key: DimensionKey;
  label: string;
  question: string;
}

interface ZoneScore {
  awareness: number;
  tension: number;
  emotional: number;
  control: number;
}

interface Zone {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  audioFile: string;
  audioTime: string;
  dimensions: DimensionQuestion[];
  blockages: string;
  practice: string;
}

type ZoneStatus = 'blocked' | 'tension' | 'free';
type BodyPattern = 'upper_blocked' | 'lower_blocked' | 'core_blocked' | 'extremities_blocked' | 'scattered' | 'mostly_free' | 'mostly_blocked';
type ProfileType = 'embodied' | 'light_blocks' | 'significant_blocks' | 'severe_blocks';

interface ResultAnalysis {
  blockedZones: string[];
  tensionZones: string[];
  freeZones: string[];
  weakestDimension: DimensionKey;
  pattern: BodyPattern;
  blockedCount: number;
  profileType: ProfileType;
}

interface TestResult {
  id: string;
  timestamp: string;
  focusValidations: Record<string, boolean>;
  zoneScores: Record<string, ZoneScore>;
  analysis: ResultAnalysis;
}

interface TestHistory {
  results: TestResult[];
  lastTestDate: string;
}

interface ProgressComparison {
  previousDate: string;
  blockedCountChange: number;
  improvedZones: string[];
  worsenedZones: string[];
}

type Stage = 'intro' | 'breathing' | 'scanning' | 'validation' | 'rating' | 'results';

// ============ КОНСТАНТЫ ============

const STORAGE_KEY = 'body_awareness_history';

const scaleOptions = [
  { value: 1, label: 'Сильный блок', description: 'Почти не чувствую / сильное напряжение', color: 'red' },
  { value: 2, label: 'Умеренное', description: 'Чувствую слабо / заметное напряжение', color: 'orange' },
  { value: 3, label: 'Лёгкое', description: 'Чувствую частично / небольшое напряжение', color: 'yellow' },
  { value: 4, label: 'Частично свободно', description: 'Чувствую хорошо / в основном расслаблено', color: 'lime' },
  { value: 5, label: 'Полностью свободно', description: 'Ощущаю ясно / полностью расслаблено', color: 'green' }
];

const dimensionLabels: Record<DimensionKey, string> = {
  awareness: 'Осознание',
  tension: 'Напряжение',
  emotional: 'Эмоциональная связь',
  control: 'Управление'
};

const dimensionInterpretations: Record<DimensionKey, string> = {
  awareness: 'Ваша слабая сторона — осознание телесных ощущений. Практикуйте медитации сканирования тела и внимательность к ощущениям в течение дня.',
  tension: 'Основная проблема — физическое напряжение. Рекомендуются релаксационные практики, массаж и работа с дыханием.',
  emotional: 'Вам сложно связывать телесные ощущения с эмоциями. Практикуйте отслеживание: «Где в теле я это чувствую?»',
  control: 'Вам сложно намеренно влиять на состояние тела. Практикуйте прогрессивную мышечную релаксацию и осознанное расслабление.'
};

const patternInterpretations: Record<BodyPattern, string> = {
  upper_blocked: 'У вас паттерн «Блокированный верх». Это может указывать на сложности с выражением, коммуникацией и ментальным контролем. Рекомендуется работа с голосом и дыхательными практиками.',
  lower_blocked: 'У вас паттерн «Блокированный низ». Это может указывать на проблемы с заземлением, базовой безопасностью и сексуальностью. Рекомендуются практики заземления и работа с тазом.',
  core_blocked: 'У вас паттерн «Блокированный центр». Блоки в груди и животе влияют на эмоциональную жизнь и чувство личной силы. Рекомендуется глубокое дыхание и сердечные практики.',
  extremities_blocked: 'У вас паттерн «Блокированные конечности». Голова и ноги связаны с мышлением и опорой. Рекомендуется баланс между заземлением и ментальным расслаблением.',
  scattered: 'У вас рассеянный паттерн блоков. Рекомендуется комплексная работа со всем телом через целостные практики.',
  mostly_free: 'Отличный результат! У вас высокая телесная осознанность с минимальными блоками.',
  mostly_blocked: 'Большинство зон тела находятся в блоке. Рекомендуется начать с мягких практик осознанности и постепенно раскрывать тело.'
};

const profileInterpretations: Record<ProfileType, { title: string; description: string; emoji: string }> = {
  embodied: {
    title: 'Воплощённый',
    description: 'Вы обладаете отличной связью с телом. Продолжайте поддерживать эту связь регулярной практикой.',
    emoji: '🌟'
  },
  light_blocks: {
    title: 'Лёгкие блоки',
    description: 'У вас есть несколько зон, требующих внимания. Сфокусируйтесь на конкретных практиках для этих зон.',
    emoji: '💫'
  },
  significant_blocks: {
    title: 'Значительные блоки',
    description: 'Несколько зон тела требуют серьёзной работы. Рекомендуется регулярная практика и работа со специалистом.',
    emoji: '⚡'
  },
  severe_blocks: {
    title: 'Серьёзные блоки',
    description: 'Большинство зон тела блокированы. Это может быть результатом стресса, травмы или хронического напряжения. Рекомендуется работа с телесным терапевтом.',
    emoji: '🔒'
  }
};

// ============ ЗОНЫ С 4 ИЗМЕРЕНИЯМИ ============

const zones: Zone[] = [
  {
    id: 'head',
    name: 'Голова и лицо',
    icon: Brain,
    color: 'purple',
    description: 'Ментальный центр, мысли, контроль',
    audioFile: 'HEAD.MP3',
    audioTime: '~1 минута',
    dimensions: [
      { key: 'awareness', label: 'Осознание', question: 'Насколько ясно вы ощущаете свою голову, лоб, челюсть прямо сейчас?' },
      { key: 'tension', label: 'Напряжение', question: 'Насколько расслаблено ваше лицо? (лоб, челюсть, глаза)' },
      { key: 'emotional', label: 'Эмоциональная связь', question: 'Замечаете ли вы связь между своими мыслями и напряжением в голове?' },
      { key: 'control', label: 'Управление', question: 'Можете ли вы намеренно расслабить мышцы лица по своему желанию?' }
    ],
    blockages: 'Перемышление, контроль, ментальные блоки',
    practice: 'Мягкий массаж лица, осознанное расслабление челюсти, медитация наблюдения'
  },
  {
    id: 'throat',
    name: 'Горло и шея',
    icon: Wind,
    color: 'blue',
    description: 'Центр выражения и коммуникации',
    audioFile: 'TROAT.MP3',
    audioTime: '~45 секунд',
    dimensions: [
      { key: 'awareness', label: 'Осознание', question: 'Насколько чётко вы чувствуете горло и шею в данный момент?' },
      { key: 'tension', label: 'Напряжение', question: 'Насколько свободно и расслаблено ваше горло? Есть ли «комок»?' },
      { key: 'emotional', label: 'Эмоциональная связь', question: 'Замечаете ли вы связь между невысказанными словами и ощущениями в горле?' },
      { key: 'control', label: 'Управление', question: 'Можете ли вы осознанно расслабить шею и горло?' }
    ],
    blockages: 'Невысказанность, подавленные эмоции, страх самовыражения',
    practice: 'Голосовые практики, пение, говорение правды, растяжка шеи'
  },
  {
    id: 'chest',
    name: 'Грудь и сердце',
    icon: Heart,
    color: 'green',
    description: 'Эмоциональный центр, любовь, связь',
    audioFile: 'CHEST.MP3',
    audioTime: '~2 минуты',
    dimensions: [
      { key: 'awareness', label: 'Осознание', question: 'Насколько ясно вы ощущаете область груди и сердца?' },
      { key: 'tension', label: 'Напряжение', question: 'Насколько свободно ваше дыхание? Есть ли тяжесть в груди?' },
      { key: 'emotional', label: 'Эмоциональная связь', question: 'Чувствуете ли вы связь между эмоциями и ощущениями в груди?' },
      { key: 'control', label: 'Управление', question: 'Можете ли вы намеренно «раскрыть» грудь и углубить дыхание?' }
    ],
    blockages: 'Закрытость, страх близости, старые раны',
    practice: 'Раскрывающие асаны, обнимания, практики самопринятия'
  },
  {
    id: 'belly',
    name: 'Живот и солнечное сплетение',
    icon: Zap,
    color: 'yellow',
    description: 'Центр силы, воли, действия',
    audioFile: 'BELLY.MP3',
    audioTime: '~30 секунд',
    dimensions: [
      { key: 'awareness', label: 'Осознание', question: 'Насколько хорошо вы чувствуете свой живот изнутри?' },
      { key: 'tension', label: 'Напряжение', question: 'Насколько расслаблен ваш живот? Втягиваете ли вы его?' },
      { key: 'emotional', label: 'Эмоциональная связь', question: 'Замечаете ли вы связь между тревогой/волнением и ощущениями в животе?' },
      { key: 'control', label: 'Управление', question: 'Можете ли вы осознанно расслабить живот и дышать «животом»?' }
    ],
    blockages: 'Страх действия, низкая самооценка, контроль',
    practice: 'Дыхание животом, динамические практики, укрепление границ'
  },
  {
    id: 'pelvis',
    name: 'Таз и гениталии',
    icon: Droplets,
    color: 'orange',
    description: 'Сексуальный и творческий центр',
    audioFile: 'PELVIS.MP3',
    audioTime: '~1.5 минуты',
    dimensions: [
      { key: 'awareness', label: 'Осознание', question: 'Насколько комфортно вам направлять внимание в эту область?' },
      { key: 'tension', label: 'Напряжение', question: 'Насколько расслаблена тазовая область? Есть ли зажатость?' },
      { key: 'emotional', label: 'Эмоциональная связь', question: 'Можете ли вы позволить себе чувствовать эту зону без стыда?' },
      { key: 'control', label: 'Управление', question: 'Можете ли вы намеренно расслабить мышцы таза?' }
    ],
    blockages: 'Стыд, сексуальные табу, подавленная креативность',
    practice: 'Тазовые движения, танец, работа с удовольствием и чувственностью'
  },
  {
    id: 'legs',
    name: 'Ноги и стопы',
    icon: Footprints,
    color: 'red',
    description: 'Центр заземления и базовой безопасности',
    audioFile: 'LEGS.MP3',
    audioTime: '~30 секунд',
    dimensions: [
      { key: 'awareness', label: 'Осознание', question: 'Насколько отчётливо вы ощущаете свои ноги и стопы?' },
      { key: 'tension', label: 'Напряжение', question: 'Насколько расслаблены ваши ноги? Чувствуете ли вы опору?' },
      { key: 'emotional', label: 'Эмоциональная связь', question: 'Ощущаете ли вы связь между чувством безопасности и ощущениями в ногах?' },
      { key: 'control', label: 'Управление', question: 'Можете ли вы намеренно «укорениться» и усилить контакт с землёй?' }
    ],
    blockages: 'Небезопасность, отсутствие опоры, страх выживания',
    practice: 'Ходьба босиком, приседания, практики заземления'
  }
];

// ============ ФУНКЦИИ ПОДСЧЁТА ============

function calculateZoneStatus(scores: ZoneScore): ZoneStatus {
  const avg = (scores.awareness + scores.tension + scores.emotional + scores.control) / 4;
  if (avg <= 2) return 'blocked';
  if (avg <= 3.5) return 'tension';
  return 'free';
}

function getZoneAverage(scores: ZoneScore): number {
  return (scores.awareness + scores.tension + scores.emotional + scores.control) / 4;
}

function detectPattern(blockedZones: string[]): BodyPattern {
  if (blockedZones.length <= 1) return 'mostly_free';
  if (blockedZones.length >= 4) return 'mostly_blocked';

  const upperBody = ['head', 'throat', 'chest'];
  const lowerBody = ['belly', 'pelvis', 'legs'];
  const core = ['chest', 'belly'];
  const extremities = ['head', 'legs'];

  const upperBlocked = blockedZones.filter(z => upperBody.includes(z)).length;
  const lowerBlocked = blockedZones.filter(z => lowerBody.includes(z)).length;

  if (upperBlocked >= 2 && lowerBlocked <= 1) return 'upper_blocked';
  if (lowerBlocked >= 2 && upperBlocked <= 1) return 'lower_blocked';
  if (blockedZones.filter(z => core.includes(z)).length >= 2) return 'core_blocked';
  if (blockedZones.filter(z => extremities.includes(z)).length >= 2) return 'extremities_blocked';

  return 'scattered';
}

function analyzeResults(zoneScores: Record<string, ZoneScore>): ResultAnalysis {
  const blocked: string[] = [];
  const tension: string[] = [];
  const free: string[] = [];

  Object.entries(zoneScores).forEach(([zoneId, scores]) => {
    const status = calculateZoneStatus(scores);
    if (status === 'blocked') blocked.push(zoneId);
    else if (status === 'tension') tension.push(zoneId);
    else free.push(zoneId);
  });

  const dimensionTotals: Record<DimensionKey, number> = {
    awareness: 0, tension: 0, emotional: 0, control: 0
  };
  Object.values(zoneScores).forEach(scores => {
    dimensionTotals.awareness += scores.awareness;
    dimensionTotals.tension += scores.tension;
    dimensionTotals.emotional += scores.emotional;
    dimensionTotals.control += scores.control;
  });
  const weakestDimension = Object.entries(dimensionTotals)
    .sort((a, b) => a[1] - b[1])[0][0] as DimensionKey;

  const pattern = detectPattern(blocked);

  const blockedCount = blocked.length;
  let profileType: ProfileType;
  if (blockedCount === 0) profileType = 'embodied';
  else if (blockedCount <= 2) profileType = 'light_blocks';
  else if (blockedCount <= 4) profileType = 'significant_blocks';
  else profileType = 'severe_blocks';

  return {
    blockedZones: blocked,
    tensionZones: tension,
    freeZones: free,
    weakestDimension,
    pattern,
    blockedCount,
    profileType
  };
}

// ============ localStorage ФУНКЦИИ ============

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getTestHistory(): TestHistory {
  if (typeof window === 'undefined') return { results: [], lastTestDate: '' };
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { results: [], lastTestDate: '' };
  try {
    return JSON.parse(stored);
  } catch {
    return { results: [], lastTestDate: '' };
  }
}

function saveTestResult(result: TestResult): void {
  if (typeof window === 'undefined') return;
  const history = getTestHistory();
  history.results.push(result);
  history.lastTestDate = result.timestamp;
  if (history.results.length > 10) {
    history.results = history.results.slice(-10);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function getProgressComparison(currentResult: TestResult): ProgressComparison | null {
  const history = getTestHistory();
  if (history.results.length === 0) return null;

  const previousResult = history.results[history.results.length - 1];

  const improvedZones: string[] = [];
  const worsenedZones: string[] = [];

  zones.forEach(zone => {
    const prevScores = previousResult.zoneScores[zone.id];
    const currScores = currentResult.zoneScores[zone.id];
    if (prevScores && currScores) {
      const prevAvg = getZoneAverage(prevScores);
      const currAvg = getZoneAverage(currScores);
      if (currAvg - prevAvg >= 0.5) improvedZones.push(zone.id);
      if (prevAvg - currAvg >= 0.5) worsenedZones.push(zone.id);
    }
  });

  return {
    previousDate: previousResult.timestamp,
    blockedCountChange: currentResult.analysis.blockedCount - previousResult.analysis.blockedCount,
    improvedZones,
    worsenedZones
  };
}

// ============ КОМПОНЕНТ ============

const BodyAwarenessTest = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [currentZone, setCurrentZone] = useState(0);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [zoneScores, setZoneScores] = useState<Record<string, ZoneScore>>({});
  const [currentZoneScores, setCurrentZoneScores] = useState<Partial<ZoneScore>>({});
  const [focusValidations, setFocusValidations] = useState<Record<string, boolean>>({});
  const [breathCount, setBreathCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [progressComparison, setProgressComparison] = useState<ProgressComparison | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const zone = zones[currentZone];
  const dimension = zone?.dimensions[currentDimension];

  useEffect(() => {
    if (audioRef.current && stage === 'scanning') {
      const audio = audioRef.current;

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
    }
  }, [currentZone, stage]);

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

  const handleValidationAnswer = (focused: boolean) => {
    setFocusValidations({ ...focusValidations, [zone.id]: focused });
    setStage('rating');
    setCurrentDimension(0);
    setCurrentZoneScores({});
  };

  const handleDimensionScore = (score: number) => {
    const newScores = { ...currentZoneScores, [dimension.key]: score };
    setCurrentZoneScores(newScores);

    if (currentDimension < 3) {
      setCurrentDimension(currentDimension + 1);
    } else {
      const completeScores: ZoneScore = {
        awareness: newScores.awareness || 1,
        tension: newScores.tension || 1,
        emotional: newScores.emotional || 1,
        control: newScores.control || 1
      };
      setZoneScores({ ...zoneScores, [zone.id]: completeScores });

      if (currentZone < zones.length - 1) {
        setCurrentZone(currentZone + 1);
        setCurrentDimension(0);
        setCurrentZoneScores({});
        setStage('scanning');
        setHasListened(false);
        setAudioProgress(0);
      } else {
        const finalScores = { ...zoneScores, [zone.id]: completeScores };
        const analysis = analyzeResults(finalScores);
        const result: TestResult = {
          id: generateId(),
          timestamp: new Date().toISOString(),
          focusValidations,
          zoneScores: finalScores,
          analysis
        };
        setTestResult(result);
        const comparison = getProgressComparison(result);
        setProgressComparison(comparison);
        saveTestResult(result);
        setStage('results');
      }
    }
  };

  const getColorClass = (color: string, variant: 'bg' | 'light' | 'text' | 'border' = 'bg') => {
    const colors: Record<string, Record<string, string>> = {
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
    };
    return colors[color]?.[variant] || colors.purple[variant];
  };

  const getScaleColor = (value: number) => {
    const colors: Record<number, string> = {
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-lime-500',
      5: 'bg-green-500'
    };
    return colors[value] || 'bg-gray-500';
  };

  const resetTest = () => {
    setStage('intro');
    setCurrentZone(0);
    setCurrentDimension(0);
    setZoneScores({});
    setCurrentZoneScores({});
    setFocusValidations({});
    setHasListened(false);
    setAudioProgress(0);
    setShowBookingForm(false);
    setTestResult(null);
    setProgressComparison(null);
  };

  // ============ INTRO STAGE ============
  if (stage === 'intro') {
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
          onClick={startTest}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
        >
          Начать тест
        </button>
      </div>
    );
  }

  // ============ BREATHING STAGE ============
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

  // ============ SCANNING STAGE (Audio) ============
  if (stage === 'scanning') {
    const Icon = zone.icon;
    const audioUrl = getAudioUrl(zone.audioFile);

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
          onClick={() => setStage('validation')}
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
  }

  // ============ VALIDATION STAGE ============
  if (stage === 'validation') {
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
              onClick={() => handleValidationAnswer(true)}
              className="flex-1 bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition shadow-md"
            >
              Да, удалось
            </button>
            <button
              onClick={() => handleValidationAnswer(false)}
              className="flex-1 bg-amber-500 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition shadow-md"
            >
              Было сложно
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ RATING STAGE (4 dimensions) ============
  if (stage === 'rating') {
    const Icon = zone.icon;

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
                onClick={() => handleDimensionScore(option.value)}
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
  }

  // ============ RESULTS STAGE ============
  if (stage === 'results' && testResult) {
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

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl mb-6 text-white shadow-lg">
          <h3 className="font-bold text-2xl mb-3">🌟 Хотите разобраться глубже?</h3>
          <p className="mb-4 opacity-90">
            Запишитесь на бесплатную 30-минутную консультацию с Джаханом.
          </p>
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition shadow-md"
          >
            Записаться на бесплатную сессию
          </button>
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
                const Icon = z.icon;
                return (
                  <div key={zoneId} className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className={`w-6 h-6 ${getColorClass(z.color, 'text')}`} />
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
                const Icon = z.icon;
                return (
                  <div key={zoneId} className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${getColorClass(z.color, 'text')}`} />
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
                const Icon = z.icon;
                return (
                  <div key={zoneId} className="bg-white p-4 rounded-lg flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${getColorClass(z.color, 'text')}`} />
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
          <p className="mb-4 text-lg">Готовы начать трансформацию?</p>
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition shadow-md"
          >
            Записаться на бесплатную сессию
          </button>
        </div>

        <button
          onClick={resetTest}
          className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Пройти тест заново
        </button>
      </div>
    );
  }

  return null;
};

export default BodyAwarenessTest;
