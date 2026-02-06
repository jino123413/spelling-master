import React, { useState, useEffect, useRef } from 'react';

interface ResultScreenProps {
  level: { label: string; emoji: string };
  score: number;
  total: number;
  grade: { label: string; title: string; description: string; color: string };
  onRetry: () => void;
  onBackHome: () => void;
  onViewWrongAnswers: () => void;
  onViewGradeReport: () => void;
  wrongCount: number;
}

export default function ResultScreen({
  level,
  score,
  total,
  grade,
  onRetry,
  onBackHome,
  onViewWrongAnswers,
  onViewGradeReport,
  wrongCount,
}: ResultScreenProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [showGrade, setShowGrade] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const animFrameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Animated count-up for score
    if (score === 0) {
      setDisplayScore(0);
      setShowGrade(true);
      setTimeout(() => setShowContent(true), 300);
      return;
    }

    let current = 0;
    const stepTime = Math.max(40, 600 / score);

    const step = () => {
      current += 1;
      setDisplayScore(current);
      if (current < score) {
        animFrameRef.current = setTimeout(step, stepTime);
      } else {
        setShowGrade(true);
        setTimeout(() => setShowContent(true), 300);
      }
    };

    animFrameRef.current = setTimeout(step, 300);

    return () => {
      if (animFrameRef.current) {
        clearTimeout(animFrameRef.current);
      }
    };
  }, [score]);

  const accuracyPercent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="result-screen">
      <div className="result-screen__top">
        <div className="result-level-tag">
          <span>{level.emoji}</span>
          <span>{level.label}</span>
        </div>

        <div className="result-score">
          <span className="result-score__current">{displayScore}</span>
          <span className="result-score__separator">/</span>
          <span className="result-score__total">{total}</span>
        </div>

        <div className={`result-grade ${showGrade ? 'result-grade--visible' : ''}`}>
          <div
            className="result-grade__badge"
            style={{ backgroundColor: grade.color }}
          >
            <span className="result-grade__label">{grade.label}</span>
          </div>
          <h2 className="result-grade__title">{grade.title}</h2>
          <p className="result-grade__description">{grade.description}</p>
        </div>
      </div>

      <div className={`result-content ${showContent ? 'result-content--visible' : ''}`}>
        <div className="result-stats">
          <div className="result-stats__item">
            <span className="result-stats__label">정답률</span>
            <span className="result-stats__value">{accuracyPercent}%</span>
          </div>
          <div className="result-stats__divider" />
          <div className="result-stats__item">
            <span className="result-stats__label">맞은 개수</span>
            <span className="result-stats__value">{score}문제</span>
          </div>
          <div className="result-stats__divider" />
          <div className="result-stats__item">
            <span className="result-stats__label">틀린 개수</span>
            <span className="result-stats__value">{wrongCount}문제</span>
          </div>
        </div>

        <div className="result-actions">
          <button
            className="result-action-btn result-action-btn--primary"
            onClick={onRetry}
            type="button"
          >
            <i className="ri-refresh-line" />
            <span>다시 풀기</span>
          </button>

          <button
            className="result-action-btn result-action-btn--secondary"
            onClick={onBackHome}
            type="button"
          >
            <i className="ri-home-4-line" />
            <span>다른 레벨</span>
          </button>

          {wrongCount > 0 && (
            <button
              className="result-action-btn result-action-btn--ad"
              onClick={onViewWrongAnswers}
              type="button"
            >
              <div className="result-action-btn__top-row">
                <i className="ri-file-list-3-line" />
                <span>오답 노트 보기</span>
                <span className="result-ad-badge">AD</span>
              </div>
              <span className="result-ad-notice">
                광고 시청 후 틀린 문제의 해설을 볼 수 있어요
              </span>
            </button>
          )}

          <button
            className="result-action-btn result-action-btn--ad"
            onClick={onViewGradeReport}
            type="button"
          >
            <div className="result-action-btn__top-row">
              <i className="ri-bar-chart-box-line" />
              <span>등급표 보기</span>
              <span className="result-ad-badge">AD</span>
            </div>
            <span className="result-ad-notice">
              광고 시청 후 전체 등급표를 확인할 수 있어요
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
