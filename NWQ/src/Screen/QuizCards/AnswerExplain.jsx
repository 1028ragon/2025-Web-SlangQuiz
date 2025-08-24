// src/Screen/QuizCards/AnswerExplain.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnswerExplain.css';
import { fetchExplanation } from '../../api/quizApi';

export default function AnswerExplain() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exp, setExp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchExplanation();
        if (alive) setExp(data);
      } catch (e) {
        console.error('/explanation 에러:', e);
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const goBackToResult = () => {
    // 직전에 /answer에서 넘어왔다면 그대로 뒤로가기(상태 보존)
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // 히스토리가 없을 때의 폴백
      navigate('/start/quiz');
    }
  };

  if (loading) {
    return (
      <div className="answer-container">
        <div className="answer-card">해설을 불러오는 중...</div>
      </div>
    );
  }

  if (error || !exp) {
    return (
      <div className="answer-container">
        <div className="answer-card">
          <p>해설 데이터를 불러오지 못했습니다.</p>
          <div className="button-group">
            <button className="btn home" onClick={() => navigate('/start/quiz')}>
              문제로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="answer-container">
      <div className="answer-card">
        <div className="section-title">오답 해설</div>

        {exp.explanations.length === 0 ? (
          <div className="section-box">표시할 해설이 없습니다.</div>
        ) : (
          exp.explanations.map((it) => (
            <div key={it.option_id} style={{ marginTop: 12 }}>
              <div className="section-title" style={{ marginTop: 0 }}>
                {it.option_text}
              </div>
              <div className="section-box" style={{ whiteSpace: 'pre-wrap' }}>
                {it.option_meaning}
              </div>
            </div>
          ))
        )}

        <div className="button-group">
          <button className="btn home" onClick={goBackToResult}>
            돌아가기
          </button>
          
        </div>
      </div>
    </div>
  );
}
