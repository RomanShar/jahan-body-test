'use client'

import React, { useState } from 'react';
import type { Stage, ZoneScore, TestResult, ProgressComparison } from './types';
import { zones } from './constants';
import { analyzeResults } from './analysis';
import { generateId, saveTestResult, getProgressComparison } from './storage';

import IntroStage from './stages/IntroStage';
import BreathingStage from './stages/BreathingStage';
import ScanningStage from './stages/ScanningStage';
import ValidationStage from './stages/ValidationStage';
import RatingStage from './stages/RatingStage';
import ResultsStage from './stages/ResultsStage';

const BodyAwarenessTest = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [currentZone, setCurrentZone] = useState(0);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [zoneScores, setZoneScores] = useState<Record<string, ZoneScore>>({});
  const [currentZoneScores, setCurrentZoneScores] = useState<Partial<ZoneScore>>({});
  const [focusValidations, setFocusValidations] = useState<Record<string, boolean>>({});
  const [breathCount, setBreathCount] = useState(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [progressComparison, setProgressComparison] = useState<ProgressComparison | null>(null);

  const zone = zones[currentZone];

  const startTest = () => {
    setStage('breathing');
    let count = 3;
    const interval = setInterval(() => {
      setBreathCount(count);
      count--;
      if (count < 0) {
        clearInterval(interval);
        setStage('scanning');
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
    const dimension = zone.dimensions[currentDimension];
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

  const resetTest = () => {
    setStage('intro');
    setCurrentZone(0);
    setCurrentDimension(0);
    setZoneScores({});
    setCurrentZoneScores({});
    setFocusValidations({});
    setTestResult(null);
    setProgressComparison(null);
  };

  if (stage === 'intro') {
    return <IntroStage onStart={startTest} />;
  }

  if (stage === 'breathing') {
    return <BreathingStage breathCount={breathCount} />;
  }

  if (stage === 'scanning') {
    return (
      <ScanningStage
        zone={zone}
        currentZone={currentZone}
        onContinue={() => setStage('validation')}
      />
    );
  }

  if (stage === 'validation') {
    return <ValidationStage zone={zone} onAnswer={handleValidationAnswer} />;
  }

  if (stage === 'rating') {
    return (
      <RatingStage
        zone={zone}
        currentZone={currentZone}
        currentDimension={currentDimension}
        currentZoneScores={currentZoneScores}
        onScore={handleDimensionScore}
      />
    );
  }

  if (stage === 'results' && testResult) {
    return (
      <ResultsStage
        testResult={testResult}
        progressComparison={progressComparison}
        onReset={resetTest}
      />
    );
  }

  return null;
};

export default BodyAwarenessTest;
