import type { TestHistory, TestResult, ProgressComparison } from './types';
import { zones } from './constants';
import { getZoneAverage } from './analysis';

const STORAGE_KEY = 'body_awareness_history';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getTestHistory(): TestHistory {
  if (typeof window === 'undefined') return { results: [], lastTestDate: '' };
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { results: [], lastTestDate: '' };
  try {
    return JSON.parse(stored);
  } catch {
    return { results: [], lastTestDate: '' };
  }
}

export function saveTestResult(result: TestResult): void {
  if (typeof window === 'undefined') return;
  const history = getTestHistory();
  history.results.push(result);
  history.lastTestDate = result.timestamp;
  if (history.results.length > 10) {
    history.results = history.results.slice(-10);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getProgressComparison(currentResult: TestResult): ProgressComparison | null {
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
