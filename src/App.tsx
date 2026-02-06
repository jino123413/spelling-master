import { useState, useCallback, useRef, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import WrongAnswerNote from './components/WrongAnswerNote';
import GradeReport from './components/GradeReport';
import { useInterstitialAd } from './hooks/useInterstitialAd';
import { LEVELS, GRADES, getQuestionsForLevel, getGrade } from './data/questions';
import type { LevelId, Question } from './data/questions';
import * as storage from './utils/storage';

type Screen = 'home' | 'quiz' | 'result';

interface QuizResult {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

interface WrongAnswer {
  question: Question;
  selectedIndex: number;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentLevelId, setCurrentLevelId] = useState<LevelId | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [showWrongNote, setShowWrongNote] = useState(false);
  const [showGradeReport, setShowGradeReport] = useState(false);
  const [storageData, setStorageData] = useState<storage.StorageData | null>(null);

  const { showInterstitialAd } = useInterstitialAd();

  // Track which ad points have been shown this session
  const adShownRef = useRef(new Set<string>());

  // Load storage data on mount
  useEffect(() => {
    const data = storage.loadData();
    setStorageData(data);
  }, []);

  // Refresh storage data helper
  const refreshStorage = useCallback(() => {
    const data = storage.loadData();
    setStorageData(data);
  }, []);

  // Unified ad-gating pattern: show ad once per key, then callback
  const tryWithAd = useCallback(
    (key: string, callback: () => void) => {
      if (!adShownRef.current.has(key)) {
        showInterstitialAd({
          onDismiss: () => {
            adShownRef.current.add(key);
            callback();
          },
        });
      } else {
        callback();
      }
    },
    [showInterstitialAd],
  );

  // Shuffle questions using Fisher-Yates algorithm
  const shuffleQuestions = useCallback((questions: Question[]): Question[] => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Start a quiz for the given level
  const startQuiz = useCallback(
    (levelId: LevelId) => {
      const questions = getQuestionsForLevel(levelId);
      const shuffled = shuffleQuestions(questions);
      setCurrentLevelId(levelId);
      setCurrentQuestions(shuffled);
      setQuizResults([]);
      setWrongAnswers([]);
      setScreen('quiz');
    },
    [shuffleQuestions],
  );

  // Handle level selection from HomeScreen
  const handleSelectLevel = useCallback(
    (levelId: LevelId) => {
      const isUnlocked =
        levelId === 'beginner' ||
        (storageData?.unlockedLevels ?? []).includes(levelId);

      if (isUnlocked) {
        // Already unlocked: start quiz directly (FREE)
        startQuiz(levelId);
      } else {
        // Locked: show ad to unlock, persist unlock, then start quiz
        const adKey = `unlock-${levelId}`;
        tryWithAd(adKey, () => {
          storage.unlockLevel(levelId);
          refreshStorage();
          startQuiz(levelId);
        });
      }
    },
    [storageData, startQuiz, tryWithAd, refreshStorage],
  );

  // Handle quiz completion
  const handleQuizComplete = useCallback(
    (results: QuizResult[]) => {
      if (!currentLevelId) return;

      const score = results.filter((r) => r.isCorrect).length;
      const total = results.length;

      // Build wrong answers list
      const wrongs: WrongAnswer[] = results
        .filter((r) => !r.isCorrect)
        .map((r) => {
          const question = currentQuestions.find((q) => q.id === r.questionId);
          return question ? { question, selectedIndex: r.selectedIndex } : null;
        })
        .filter((item): item is WrongAnswer => item !== null);

      // Update storage with quiz results
      storage.updateLevelStats(currentLevelId, score, total);
      refreshStorage();

      setQuizResults(results);
      setWrongAnswers(wrongs);
      setScreen('result');
    },
    [currentLevelId, currentQuestions, refreshStorage],
  );

  // Retry same level (FREE, no ad)
  const handleRetry = useCallback(() => {
    if (currentLevelId) {
      startQuiz(currentLevelId);
    }
  }, [currentLevelId, startQuiz]);

  // Go back to home screen
  const handleBackHome = useCallback(() => {
    setScreen('home');
    setCurrentLevelId(null);
    setCurrentQuestions([]);
    setQuizResults([]);
    setWrongAnswers([]);
    setShowWrongNote(false);
    setShowGradeReport(false);
  }, []);

  // View wrong answers (ad-gated first time per session)
  const handleViewWrongAnswers = useCallback(() => {
    tryWithAd('wrong-note', () => {
      setShowWrongNote(true);
    });
  }, [tryWithAd]);

  // View grade report (ad-gated first time per session)
  const handleViewGradeReport = useCallback(() => {
    tryWithAd('grade-report', () => {
      setShowGradeReport(true);
    });
  }, [tryWithAd]);

  // Derive data for components from storage
  const unlockedLevels = storageData?.unlockedLevels ?? [];
  const levelStats = storageData?.levelStats ?? {};

  // Build current level info object for child components
  const currentLevel = currentLevelId
    ? LEVELS.find((l) => l.id === currentLevelId) ?? null
    : null;

  // Compute quiz score and grade for result screen
  const score = quizResults.filter((r) => r.isCorrect).length;
  const total = quizResults.length;
  const wrongCount = total - score;
  const gradeKey = total > 0 ? getGrade(Math.round((score / total) * 100)) : null;
  const gradeResult = gradeKey ? GRADES[gradeKey] : null;

  // Build overall stats for grade report
  const overallStatsRaw = storage.getOverallStats();
  const overallStats = {
    ...overallStatsRaw,
    accuracy: overallStatsRaw.totalQuestions > 0
      ? Math.round((overallStatsRaw.totalCorrect / overallStatsRaw.totalQuestions) * 100)
      : 0,
    overallGrade: overallStatsRaw.overallGrade as string,
  };

  // Build grade info map for GradeReport component
  const gradeInfo: Record<
    string,
    { label: string; title: string; color: string; description: string }
  > = {};
  for (const [key, grade] of Object.entries(GRADES)) {
    gradeInfo[key] = {
      label: grade.label,
      title: grade.title,
      color: grade.color,
      description: grade.description,
    };
  }

  // Build levels info array for GradeReport component
  const levelsForReport = LEVELS.map((l) => ({
    id: l.id,
    label: l.label,
    icon: l.icon,
    color: l.color,
  }));

  return (
    <div className="app">
      {screen === 'home' && (
        <HomeScreen
          onSelectLevel={handleSelectLevel}
          onViewGradeReport={handleViewGradeReport}
          levelStats={levelStats}
          unlockedLevels={unlockedLevels}
        />
      )}

      {screen === 'quiz' && currentLevel && currentQuestions.length > 0 && (
        <QuizScreen
          level={{
            id: currentLevel.id,
            label: currentLevel.label,
            icon: currentLevel.icon,
            color: currentLevel.color,
          }}
          questions={currentQuestions}
          onComplete={handleQuizComplete}
          onExit={handleBackHome}
        />
      )}

      {screen === 'result' && currentLevel && gradeResult && (
        <ResultScreen
          level={{ label: currentLevel.label, icon: currentLevel.icon }}
          score={score}
          total={total}
          grade={{
            label: gradeResult.label,
            title: gradeResult.title,
            description: gradeResult.description,
            color: gradeResult.color,
          }}
          onRetry={handleRetry}
          onBackHome={handleBackHome}
          onViewWrongAnswers={handleViewWrongAnswers}
          onViewGradeReport={handleViewGradeReport}
          wrongCount={wrongCount}
        />
      )}

      {showWrongNote && wrongAnswers.length > 0 && (
        <WrongAnswerNote
          wrongAnswers={wrongAnswers}
          onClose={() => setShowWrongNote(false)}
        />
      )}

      {showGradeReport && (
        <GradeReport
          overallStats={overallStats}
          levelStats={levelStats}
          levels={levelsForReport}
          gradeInfo={gradeInfo}
          onClose={() => setShowGradeReport(false)}
        />
      )}
    </div>
  );
}
