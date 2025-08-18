// src/components/HelpScreen.jsx
import React from 'react';
import './HelpScreen.css';

export default function HelpScreen({ quiz, hintData, onBack }) {
  return (
    <div className="help-container">
      <div className="help-card">
        {/* 제목 */}
        <div className="help-title">도움말</div>

        {/* 퀴즈 이미지 */}
        <img src={quiz.getImageUrl()} alt="quiz-help" className="help-image" />

        {/* hintData가 아직 없을 경우 */}
        {!hintData ? (
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', marginTop: '20px' }}>
            로딩 중...
          </div>
        ) : (
          <>
            {/* 의미 영역 */}
            <div className="section-title">의미</div>
            <div className="section-box">
              {hintData.meaning.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>

            {/* 예시 영역 */}
            <div className="section-title">예시</div>
            <div className="section-box">
              {hintData.example.replace(hintData.answer, '(     )')}
            </div>
          </>
        )}

        {/* 뒤로가기 버튼 */}
        <button className="btn-back" onClick={onBack}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}
