// src/Screen/QuizCards/HelpScreen.jsx
import React, { useEffect, useState } from 'react';
import './HelpScreen.css';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_SERVER_URL || 'http://15.164.233.1:8080';

export default function HelpScreen({ quiz, onBack }) {
  const [hintData, setHintData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quiz || typeof quiz.getId !== 'function') return;

    const fetchHint = async () => {
      try {
        const res = await axios.get(`${API_BASE}/quizzes/${quiz.getId()}/hint`, {
          withCredentials: true,
        });

        const data = res.data;
        setHintData({
          meaning: data.hint_text,
          example: data.example_text,
        });
      } catch (err) {
        console.error('힌트 API 호출 실패:', err);
        setHintData(null); // 또는 에러 메시지를 따로 처리 가능
      } finally {
        setLoading(false);
      }
    };

    fetchHint();
  }, [quiz]);

  if (!quiz || typeof quiz.getImageUrl !== 'function') {
    return <div>퀴즈 정보가 없습니다.</div>;
  }

  return (
    <div className="help-container">
      <div className="help-card">
        <div className="help-title">도움말</div>

        <img src={quiz.getImageUrl()} alt="quiz-help" className="help-image" />

        {loading ? (
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', marginTop: '20px' }}>
            로딩 중...
          </div>
        ) : hintData ? (
          <>
            <div className="section-title">의미</div>
            <div className="section-box">
              {hintData.meaning.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>

            <div className="section-title">예시</div>
            <div className="section-box">
              {hintData.example}
            </div>
          </>
        ) : (
          <div className="section-box">힌트 데이터를 불러오지 못했습니다.</div>
        )}

        <button className="btn-back" onClick={onBack}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}
