import type { ZoneScore, ZoneStatus, BodyPattern, ProfileType, DimensionKey, ResultAnalysis } from './types';

export function calculateZoneStatus(scores: ZoneScore): ZoneStatus {
  const avg = (scores.awareness + scores.tension + scores.emotional + scores.control) / 4;
  if (avg <= 2) return 'blocked';
  if (avg <= 3.5) return 'tension';
  return 'free';
}

export function getZoneAverage(scores: ZoneScore): number {
  return (scores.awareness + scores.tension + scores.emotional + scores.control) / 4;
}

export function detectPattern(blockedZones: string[]): BodyPattern {
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

export function analyzeResults(zoneScores: Record<string, ZoneScore>): ResultAnalysis {
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
