// src/components/AnswerExplain.jsx
import React from 'react';
import './AnswerExplain.css';

export default function AnswerExplain({ quiz, explanations, onBack }) {
  // '1, 2, 3, 4' 보기 라벨
  const optionLabels = ['1', '2', '3', '4'];

  return (
    <div className="explain-container">
      <div className="explain-card">
        <h2 className="explain-title">해설</h2>

        {/* 각 선택지와 해설 출력 */}
        {quiz.getOptions().map((option, index) => (
          <div key={index} className="explain-item">
            <div className="explain-option">
              {optionLabels[index]}. {option.option_text}
            </div>
            <div className="explain-bubble">
              {explanations?.[index] || '해설 없음'}
            </div>
          </div>
        ))}

        {/* 돌아가기 버튼 */}
        <button className="btn-back" onClick={onBack}>돌아가기</button>
      </div>
    </div>
  );
}
