// src/components/AnswerScreen.jsx
import React from 'react';
import './AnswerScreen.css';

// 정답 화면 컴포넌트
export default function AnswerScreen({ quiz, selected, onNext, onHome, onExplain, hintData }) {
  const isCorrect = hintData && selected === hintData.answer;

  return (
    <div className="answer-container">
      <div className="answer-card">

        {/* 정오답 아이콘 */}
        <div className={`ox-symbol ${isCorrect ? 'circle' : 'cross'}`}>
          {isCorrect ? 'O' : 'X'}
        </div>

        {/* 정오답 텍스트 */}
        <div className="result-text">
          {isCorrect ? '정답입니다' : '오답입니다'}
        </div>

        {/* 퀴즈 이미지 */}
        <img src={quiz.getImageUrl()} alt="quiz" className="quiz-image" />

        {/* 정답 단어 */}
        <div className="answer-text">{hintData?.answer || '로딩 중...'}</div>

        {/* 의미 */}
        <div className="section-title">의미</div>
        <div className="section-box">
          {typeof hintData?.meaning === 'string'
            ? hintData.meaning.split('\n').map((line, i) => <div key={i}>{line}</div>)
            : '불러오는 중...'}
        </div>

        {/* 예시 */}
        <div className="section-title">예시</div>
        <div className="section-box">
          {typeof hintData?.example === 'string'
            ? hintData.example.split('\n').map((line, i) => <div key={i}>{line}</div>)
            : '불러오는 중...'}
        </div>

        {/* 버튼 */}
        <div className="button-group">
          <button className="btn home" onClick={onHome}>홈</button>
          <button className="btn next" onClick={onNext}>다음</button>
          <button className="btn explain" onClick={onExplain}>해설</button>
        </div>
      </div>
    </div>
  );
}
