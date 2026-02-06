// =============================================================================
// LocalStorage Abstraction for 맞춤법 달인
// =============================================================================

import { type LevelId, type Grade, LEVELS, GRADES, getGrade } from '../data/questions';

const STORAGE_KEY = 'spelling-master-data';

// --- Types ---

export interface LevelStats {
  played: number;
  bestScore: number;
  bestGrade: Grade;
}

export interface WrongAnswerEntry {
  questionId: string;
  count: number;
}

export interface StorageData {
  unlockedLevels: LevelId[];
  levelStats: Record<string, LevelStats>;
  wrongAnswerHistory: WrongAnswerEntry[];
}

export interface OverallStats {
  totalPlayed: number;
  totalCorrect: number;
  totalQuestions: number;
  overallGrade: Grade;
}

// --- Default Data ---

function getDefaultData(): StorageData {
  return {
    unlockedLevels: ['beginner'],
    levelStats: {},
    wrongAnswerHistory: [],
  };
}

// --- Core Functions ---

export function loadData(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();

    const parsed = JSON.parse(raw) as StorageData;

    // Ensure unlockedLevels always includes beginner
    if (!parsed.unlockedLevels || !parsed.unlockedLevels.includes('beginner')) {
      parsed.unlockedLevels = ['beginner', ...(parsed.unlockedLevels || [])];
    }
    if (!parsed.levelStats) parsed.levelStats = {};
    if (!parsed.wrongAnswerHistory) parsed.wrongAnswerHistory = [];

    return parsed;
  } catch {
    return getDefaultData();
  }
}

export function saveData(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data to localStorage', e);
  }
}

// --- Level Unlock ---

export function unlockLevel(levelId: LevelId): void {
  const data = loadData();
  if (!data.unlockedLevels.includes(levelId)) {
    data.unlockedLevels.push(levelId);
    saveData(data);
  }
}

export function isLevelUnlocked(levelId: LevelId): boolean {
  const data = loadData();
  return data.unlockedLevels.includes(levelId);
}

// --- Level Stats ---

export function updateLevelStats(levelId: LevelId, score: number, total: number): void {
  const data = loadData();
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const grade = getGrade(percent);
  const existing = data.levelStats[levelId];

  if (!existing) {
    data.levelStats[levelId] = {
      played: 1,
      bestScore: score,
      bestGrade: grade,
    };
  } else {
    existing.played += 1;
    if (score > existing.bestScore) {
      existing.bestScore = score;
      existing.bestGrade = grade;
    }
  }

  // Auto-unlock next level if scored 60% or above
  if (percent >= 60) {
    const levelIds: LevelId[] = LEVELS.map((l) => l.id);
    const currentIdx = levelIds.indexOf(levelId);
    if (currentIdx >= 0 && currentIdx < levelIds.length - 1) {
      const nextLevelId = levelIds[currentIdx + 1];
      if (!data.unlockedLevels.includes(nextLevelId)) {
        data.unlockedLevels.push(nextLevelId);
      }
    }
  }

  saveData(data);
}

// --- Wrong Answers ---

export function addWrongAnswers(questionIds: string[]): void {
  const data = loadData();

  for (const qid of questionIds) {
    const existing = data.wrongAnswerHistory.find((e) => e.questionId === qid);
    if (existing) {
      existing.count += 1;
    } else {
      data.wrongAnswerHistory.push({ questionId: qid, count: 1 });
    }
  }

  saveData(data);
}

// --- Overall Stats ---

export function getOverallStats(): OverallStats {
  const data = loadData();
  const stats = data.levelStats;

  let totalPlayed = 0;
  let totalCorrect = 0;
  let totalQuestions = 0;

  for (const level of LEVELS) {
    const s = stats[level.id];
    if (s) {
      totalPlayed += s.played;
      totalCorrect += s.bestScore;
      totalQuestions += level.questions.length;
    }
  }

  const percent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const overallGrade = getGrade(percent);

  return {
    totalPlayed,
    totalCorrect,
    totalQuestions,
    overallGrade,
  };
}
