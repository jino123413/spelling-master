import React from 'react';

interface WrongAnswerNoteProps {
  wrongAnswers: Array<{
    question: {
      type: string;
      category: string;
      question: string;
      context: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
    selectedIndex: number;
  }>;
  onClose: () => void;
}

const categoryMap: Record<string, { label: string; className: string }> = {
  '맞춤법': { label: '맞춤법', className: 'wrong-item__category-badge--spelling' },
  '띄어쓰기': { label: '띄어쓰기', className: 'wrong-item__category-badge--spacing' },
  '문법': { label: '문법', className: 'wrong-item__category-badge--grammar' },
};

export default function WrongAnswerNote({ wrongAnswers, onClose }: WrongAnswerNoteProps) {
  if (wrongAnswers.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="wrong-note-header">
          <h2 className="wrong-note-header__title">오답 노트</h2>
          <span className="wrong-note-header__count">{wrongAnswers.length}문제</span>
          <button className="modal-close-btn" onClick={onClose} aria-label="닫기">
            <i className="ri-close-line" />
          </button>
        </div>

        <ul className="wrong-note-list">
          {wrongAnswers.map((item, index) => {
            const { question, selectedIndex } = item;
            const cat = categoryMap[question.category] || {
              label: question.category,
              className: 'wrong-item__category-badge--spelling',
            };

            return (
              <li className="wrong-item" key={index}>
                <div className="wrong-item__top">
                  <span className={`wrong-item__category-badge ${cat.className}`}>
                    {cat.label}
                  </span>
                  <span className="wrong-item__number">Q{index + 1}</span>
                </div>

                <p className="wrong-item__question">{question.question}</p>

                {question.context && (
                  <p className="wrong-item__context">
                    <i className="ri-chat-quote-line" />
                    {question.context}
                  </p>
                )}

                <div className="wrong-item__answers">
                  <div className="wrong-item__my-answer">
                    <i className="ri-close-circle-fill" />
                    <span className="wrong-item__answer-label">내 답</span>
                    <span className="wrong-item__answer-text">
                      {question.options[selectedIndex]}
                    </span>
                  </div>
                  <div className="wrong-item__correct-answer">
                    <i className="ri-checkbox-circle-fill" />
                    <span className="wrong-item__answer-label">정답</span>
                    <span className="wrong-item__answer-text">
                      {question.options[question.correctIndex]}
                    </span>
                  </div>
                </div>

                <div className="wrong-item__explanation">
                  <i className="ri-lightbulb-line" />
                  <p>{question.explanation}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
