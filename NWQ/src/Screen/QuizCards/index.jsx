// src/Screen/QuizCards/index.jsx
import React from 'react';
import './QuizCard.css';
import { useNavigate } from 'react-router-dom';

export default function QuizCard({ quiz, onAnswer }) {
  const colors = ['pink', 'lightyellow', 'lightblue', 'lightgreen'];
  const optionLabels = ['1', '2', '3', '4'];
  const navigate = useNavigate();

  // 안전 가드
  if (
    !quiz ||
    typeof quiz.getText !== 'function' ||
    typeof quiz.getImageUrl !== 'function' ||
    typeof quiz.getOptions !== 'function'
  ) {
    return (
      <div
        className="quiz-container"
        style={{ width: '100vw', maxWidth: '100vw' }}   // ✅ 뷰포트 기준 가로 채우기
      >
        <div
          className="quiz-card"
          style={{ width: 'min(900px, 96vw)' }}        // ✅ 화면 폭에 맞춰 확대
        >
          <div className="quiz-title">신조어 퀴즈</div>
          <div className="quiz-subtitle">퀴즈 데이터를 불러오는 중입니다...</div>
        </div>
      </div>
    );
  }

  const imgUrl = quiz.getImageUrl?.();
  const options = quiz.getOptions?.() || [];

  return (
    <div
      className="quiz-container"
      style={{
        width: '100vw',          // ✅ 부모 레이아웃 영향 최소화
        maxWidth: '100vw',
        paddingLeft: 'max(16px, env(safe-area-inset-left))',
        paddingRight: 'max(16px, env(safe-area-inset-right))',
      }}
    >
      <div
        className="quiz-card"
        style={{ width: 'min(900px, 96vw)' }}          // ✅ 모바일에서 크게
      >
        <div className="quiz-title">신조어 퀴즈</div>
        <div className="quiz-subtitle">{quiz.getText()}</div>

        {/* 이미지가 있을 때만 표시 */}
        {imgUrl ? (
          <img src={imgUrl} alt="quiz" className="quiz-image" />
        ) : null}

        <div className="quiz-options">
          {options.map((option, idx) => (
            <button
              key={option.option_id ?? idx}
              className={`option-button ${colors[idx % colors.length]}`}
              onClick={() => onAnswer(option)}
            >
              <span className="radio-circle" />
              <span className="option-text">
                {optionLabels[idx]}. {option.option_text}
              </span>
            </button>
          ))}
        </div>

        <div className="help-button-container">
          <button className="btn-help" onClick={() => navigate('/help')}>
            도움말
          </button>
        </div>
      </div>
    </div>
  );
}
