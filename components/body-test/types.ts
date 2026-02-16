export type DimensionKey = 'awareness' | 'tension' | 'emotional' | 'control';

export interface DimensionQuestion {
  key: DimensionKey;
  label: string;
  question: string;
}

export interface ZoneScore {
  awareness: number;
  tension: number;
  emotional: number;
  control: number;
}

export interface Zone {
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

export type ZoneStatus = 'blocked' | 'tension' | 'free';
export type BodyPattern = 'upper_blocked' | 'lower_blocked' | 'core_blocked' | 'extremities_blocked' | 'scattered' | 'mostly_free' | 'mostly_blocked';
export type ProfileType = 'embodied' | 'light_blocks' | 'significant_blocks' | 'severe_blocks';

export interface ResultAnalysis {
  blockedZones: string[];
  tensionZones: string[];
  freeZones: string[];
  weakestDimension: DimensionKey;
  pattern: BodyPattern;
  blockedCount: number;
  profileType: ProfileType;
}

export interface TestResult {
  id: string;
  timestamp: string;
  focusValidations: Record<string, boolean>;
  zoneScores: Record<string, ZoneScore>;
  analysis: ResultAnalysis;
}

export interface TestHistory {
  results: TestResult[];
  lastTestDate: string;
}

export interface ProgressComparison {
  previousDate: string;
  blockedCountChange: number;
  improvedZones: string[];
  worsenedZones: string[];
}

export type Stage = 'intro' | 'breathing' | 'scanning' | 'validation' | 'rating' | 'results';
