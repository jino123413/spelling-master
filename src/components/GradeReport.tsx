import React from 'react';

interface GradeReportProps {
  overallStats: {
    totalPlayed: number;
    totalCorrect: number;
    totalQuestions: number;
    overallGrade: string;
    accuracy: number;
  };
  levelStats: Record<
    string,
    { played: number; bestScore: number; bestGrade: string }
  >;
  levels: Array<{ id: string; label: string; icon: string; color: string }>;
  gradeInfo: Record<
    string,
    { label: string; title: string; color: string; description: string }
  >;
  onClose: () => void;
}

export default function GradeReport({
  overallStats,
  levelStats,
  levels,
  gradeInfo,
  onClose,
}: GradeReportProps) {
  const currentGrade = gradeInfo[overallStats.overallGrade] || gradeInfo['D'];
  const gradeClass = overallStats.overallGrade
    ? `overall-grade-badge--${overallStats.overallGrade.toLowerCase()}`
    : 'overall-grade-badge--d';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="grade-report-header">
          <h2 className="grade-report-header__title">맞춤법 등급표</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="닫기">
            <i className="ri-close-line" />
          </button>
        </div>

        <div className="overall-stats-card">
          <div className={`overall-grade-badge ${gradeClass}`}>
            {overallStats.overallGrade || '-'}
          </div>
          <div className="overall-stats-card__info">
            <h3 className="overall-stats-card__title">{currentGrade.title}</h3>
            <p className="overall-stats-card__desc">{currentGrade.description}</p>
          </div>
          <div className="overall-stats-card__numbers">
            <div className="overall-stats-card__stat">
              <span className="overall-stats-card__stat-value">
                {overallStats.totalPlayed}
              </span>
              <span className="overall-stats-card__stat-label">총 플레이</span>
            </div>
            <div className="overall-stats-card__divider" />
            <div className="overall-stats-card__stat">
              <span className="overall-stats-card__stat-value">
                {overallStats.accuracy}%
              </span>
              <span className="overall-stats-card__stat-label">정답률</span>
            </div>
            <div className="overall-stats-card__divider" />
            <div className="overall-stats-card__stat">
              <span className="overall-stats-card__stat-value">
                {overallStats.totalCorrect}/{overallStats.totalQuestions}
              </span>
              <span className="overall-stats-card__stat-label">맞힌 문제</span>
            </div>
          </div>
        </div>

        <div className="level-breakdown">
          <h3 className="level-breakdown__title">레벨별 성적</h3>
          <ul className="level-breakdown__list">
            {levels.map((level) => {
              const stat = levelStats[level.id];
              const played = stat?.played ?? 0;
              const bestGrade = stat?.bestGrade || '';
              const accuracy =
                played > 0 && stat?.bestScore != null
                  ? Math.round((stat.bestScore / 10) * 100)
                  : 0;
              const gradeLabel = bestGrade
                ? gradeInfo[bestGrade]?.label || bestGrade
                : '';
              const gradeBadgeClass = bestGrade
                ? `level-stat__grade-badge--${bestGrade.toLowerCase()}`
                : '';

              return (
                <li className="level-stat-row" key={level.id}>
                  <div className="level-stat-row__left">
                    <span className="level-stat-row__emoji"><i className={level.icon} /></span>
                    <span className="level-stat-row__name">{level.label}</span>
                  </div>
                  <div className="level-stat-row__center">
                    {played > 0 ? (
                      <>
                        <div className="level-stat__accuracy-bar">
                          <div
                            className="level-stat__accuracy-bar-fill"
                            style={{
                              width: `${accuracy}%`,
                              backgroundColor: level.color,
                            }}
                          />
                        </div>
                        <span className="level-stat__accuracy-text">
                          {accuracy}%
                        </span>
                      </>
                    ) : (
                      <span className="level-stat__not-played">미도전</span>
                    )}
                  </div>
                  <div className="level-stat-row__right">
                    {played > 0 ? (
                      <>
                        <span
                          className={`level-stat__grade-badge ${gradeBadgeClass}`}
                        >
                          {gradeLabel}
                        </span>
                        <span className="level-stat__play-count">
                          {played}회
                        </span>
                      </>
                    ) : (
                      <span className="level-stat__play-count level-stat__play-count--empty">
                        -
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
