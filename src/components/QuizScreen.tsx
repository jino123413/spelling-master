import React, { useState, useCallback, useEffect, useRef } from 'react';

interface Question {
  id: string;
  type: string;
  category: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizScreenProps {
  level: { id: string; label: string; icon: string; color: string };
  questions: Question[];
  onComplete: (results: { questionId: string; selectedIndex: number; isCorrect: boolean }[]) => void;
  onExit: () => void;
}

type AnswerState = {
  selectedIndex: number;
  isCorrect: boolean;
} | null;

function getCategoryLabel(type: string): string {
  switch (type) {
    case 'spelling': return '맞춤법';
    case 'spacing': return '띄어쓰기';
    case 'grammar': return '문법';
    default: return '맞춤법';
  }
}

function getCategoryClass(type: string): string {
  switch (type) {
    case 'spelling': return 'quiz-category-badge--spelling';
    case 'spacing': return 'quiz-category-badge--spacing';
    case 'grammar': return 'quiz-category-badge--grammar';
    default: return 'quiz-category-badge--spelling';
  }
}

function renderContext(context: string) {
  const parts = context.split(/(\{blank\})/);
  return parts.map((part, i) => {
    if (part === '{blank}') {
      return (
        <span key={i} className="quiz-question__blank">____</span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function QuizScreen({
  level,
  questions,
  onComplete,
  onExit,
}: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>(null);
  const [results, setResults] = useState<{ questionId: string; selectedIndex: number; isCorrect: boolean }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const progressPercent = ((currentIndex + (answerState ? 1 : 0)) / total) * 100;

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSelectAnswer = useCallback((selectedIndex: number) => {
    if (answerState !== null || isTransitioning) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    setAnswerState({ selectedIndex, isCorrect });

    const newResult = {
      questionId: currentQuestion.id,
      selectedIndex,
      isCorrect,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    timerRef.current = setTimeout(() => {
      if (currentIndex < total - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setAnswerState(null);
          setIsTransitioning(false);
        }, 150);
      } else {
        onComplete(updatedResults);
      }
    }, 1200);
  }, [answerState, isTransitioning, currentQuestion, currentIndex, total, results, onComplete]);

  const getOptionClass = (index: number) => {
    if (answerState === null) return 'quiz-option';

    if (index === currentQuestion.correctIndex) {
      return 'quiz-option quiz-option--correct';
    }
    if (index === answerState.selectedIndex && !answerState.isCorrect) {
      return 'quiz-option quiz-option--wrong';
    }
    return 'quiz-option quiz-option--dimmed';
  };

  const getOptionIcon = (index: number) => {
    if (answerState === null) return null;

    if (index === currentQuestion.correctIndex) {
      return <i className="ri-check-line quiz-option__icon quiz-option__icon--correct" />;
    }
    if (index === answerState.selectedIndex && !answerState.isCorrect) {
      return <i className="ri-close-line quiz-option__icon quiz-option__icon--wrong" />;
    }
    return null;
  };

  return (
    <div className="quiz-screen">
      <header className="quiz-header">
        <button
          className="quiz-header__home"
          onClick={onExit}
          type="button"
        >
          홈으로
        </button>
        <div className="quiz-header__title">
          <span className="quiz-header__emoji"><i className={level.icon} /></span>
          <span>{level.label}</span>
        </div>
        <span className="quiz-header__progress">
          {currentIndex + 1}/{total}
        </span>
      </header>

      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-bar__fill"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: level.color,
          }}
        />
      </div>

      <div className={`quiz-content ${isTransitioning ? 'quiz-content--exit' : 'quiz-content--enter'}`}>
        <div className="quiz-question-card">
          <div className="quiz-question-card__header">
            <span className={`quiz-category-badge ${getCategoryClass(currentQuestion.type)}`}>
              {getCategoryLabel(currentQuestion.type)}
            </span>
            <span className="quiz-question-card__number">
              Q{currentIndex + 1}
            </span>
          </div>

          <p className="quiz-question-card__text">
            {currentQuestion.question}
          </p>

          {currentQuestion.context && (
            <div className="quiz-question-card__context">
              <p className="quiz-question-card__context-text">
                {renderContext(currentQuestion.context)}
              </p>
            </div>
          )}
        </div>

        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => handleSelectAnswer(index)}
              disabled={answerState !== null}
              type="button"
            >
              <span className="quiz-option__number">{index + 1}</span>
              <span className="quiz-option__text">{option}</span>
              {getOptionIcon(index)}
            </button>
          ))}
        </div>

        {answerState && (
          <div className={`quiz-feedback ${answerState.isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
            <div className="quiz-feedback__header">
              {answerState.isCorrect ? (
                <>
                  <i className="ri-check-double-line" />
                  <span>정답이에요!</span>
                </>
              ) : (
                <>
                  <i className="ri-error-warning-line" />
                  <span>아쉬워요!</span>
                </>
              )}
            </div>
            <p className="quiz-feedback__explanation">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
