import React from 'react';

type LevelId = string;

interface HomeScreenProps {
  onSelectLevel: (levelId: LevelId) => void;
  onViewGradeReport: () => void;
  levelStats: Record<string, { played: number; bestScore: number; bestGrade: string }>;
}

interface LevelInfo {
  id: string;
  icon: string;
  label: string;
  description: string;
  color: string;
}

const LEVELS: LevelInfo[] = [
  { id: 'beginner', icon: 'ri-seedling-line', label: '초급', description: '자주 틀리는 기초 맞춤법', color: '#10B981' },
  { id: 'intermediate', icon: 'ri-leaf-line', label: '중급', description: '헷갈리기 쉬운 띄어쓰기', color: '#3B82F6' },
  { id: 'advanced', icon: 'ri-tree-line', label: '고급', description: '까다로운 문법과 표현', color: '#8B5CF6' },
  { id: 'expert', icon: 'ri-fire-line', label: '전문가', description: '전문가도 틀리는 맞춤법', color: '#EF4444' },
  { id: 'master', icon: 'ri-vip-crown-2-fill', label: '달인', description: '맞춤법 달인 최종 도전', color: '#F59E0B' },
];

function getGradeBadgeClass(grade: string): string {
  switch (grade) {
    case 'S': return 'home-grade-badge--s';
    case 'A': return 'home-grade-badge--a';
    case 'B': return 'home-grade-badge--b';
    case 'C': return 'home-grade-badge--c';
    case 'D': return 'home-grade-badge--d';
    default: return '';
  }
}

export default function HomeScreen({
  onSelectLevel,
  onViewGradeReport,
  levelStats,
}: HomeScreenProps) {
  const handleCardClick = (level: LevelInfo) => {
    onSelectLevel(level.id);
  };

  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="home-header__emoji"><i className="ri-quill-pen-line" /></div>
        <h1 className="home-header__title">맞춤법 달인</h1>
        <p className="home-header__subtitle">나의 맞춤법 실력은?</p>
      </header>

      <div className="home-level-list">
        {LEVELS.map((level) => {
          const stats = levelStats[level.id];

          return (
            <button
              key={level.id}
              className="home-level-card"
              onClick={() => handleCardClick(level)}
              type="button"
            >
              <div
                className="home-level-card__accent"
                style={{ backgroundColor: level.color }}
              />

              <div className="home-level-card__content">
                <div className="home-level-card__top">
                  <span className="home-level-card__emoji"><i className={level.icon} /></span>
                  <div className="home-level-card__info">
                    <span className="home-level-card__label">{level.label}</span>
                    <span className="home-level-card__description">{level.description}</span>
                  </div>
                </div>

                <div className="home-level-card__stats">
                  {stats && stats.played > 0 ? (
                    <>
                      {stats.bestGrade && (
                        <span className={`home-grade-badge ${getGradeBadgeClass(stats.bestGrade)}`}>
                          {stats.bestGrade}
                        </span>
                      )}
                      <span className="home-level-card__play-count">
                        <i className="ri-play-line" />
                        {stats.played}회
                      </span>
                    </>
                  ) : (
                    <span className="home-level-card__new-badge">NEW</span>
                  )}
                </div>
              </div>

            </button>
          );
        })}
      </div>

      <div className="home-bottom">
        <button
          className="home-grade-report-btn"
          onClick={onViewGradeReport}
          type="button"
        >
          <i className="ri-bar-chart-box-line" />
          <span>등급표 보기</span>
          <span className="home-ad-badge">AD</span>
          <span className="home-ad-notice">광고 시청 후 확인 가능</span>
        </button>
      </div>
    </div>
  );
}
