// src/components/QuizCard.jsx
import React from 'react';
import './QuizCard.css';
import { useNavigate } from 'react-router-dom';

export default function QuizCard({ quiz, onAnswer }) {
  const colors = ['pink', 'lightyellow', 'lightblue', 'lightgreen'];
  const optionLabels = ['가', '나', '다', '라'];
  const navigate = useNavigate();

  // quiz가 없거나 메서드가 없을 때 대비
  if (
    !quiz ||
    typeof quiz.getText !== 'function' ||
    typeof quiz.getImageUrl !== 'function' ||
    typeof quiz.getOptions !== 'function'
  ) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <div className="quiz-title">신조어 퀴즈</div>
          <div className="quiz-subtitle">퀴즈 데이터를 불러오는 중입니다...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-title">신조어 퀴즈</div>
        <div className="quiz-subtitle">{quiz.getText()}</div>

        <img src={quiz.getImageUrl()} alt="quiz" className="quiz-image" />

        <div className="quiz-options">
          {quiz.getOptions().map((option, idx) => (
            <button
              key={option.option_id}
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
