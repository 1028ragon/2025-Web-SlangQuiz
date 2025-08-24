// src/Screen/QuizCards/HelpScreen.jsx
import React, { useEffect, useState } from 'react';
import './HelpScreen.css';
import { useNavigate } from 'react-router-dom';
import { fetchHint } from '../../api/quizApi'; // ✅ 경로: QuizCards → api

export default function HelpScreen() {
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const d = await fetchHint(); // {status, message, quiz_order, quiz_id, hint_text, example_text}
        if (!alive) return;
        setHint({
          meaning: d.hint_text,
          example: d.example_text,
          quiz_order: d.quiz_order,
          quiz_id: d.quiz_id,
        });
      } catch (e) {
        if (!alive) return;
        const st = e?.response?.status;
        const msg = e?.response?.data?.message || e.message || '힌트를 불러오지 못했어요.';

        // 세션 없음/만료 → 시작 화면으로
        if (st === 401) {
          alert(msg || '세션이 만료되었습니다. 다시 시작해 주세요.');
          navigate('/start');
          return;
        }

        // 이미 정답 제출/모든 문제 완료(409) 등은 화면에 메시지 표시
        setErrorMsg(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [navigate]);

  const handleBack = () => navigate(-1); // 뒤로

  return (
    <div className="help-container">
      <div className="help-card">
        <div className="help-title">도움말</div>

        {loading && (
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', marginTop: '20px' }}>
            로딩 중…
          </div>
        )}

        {!loading && errorMsg && (
          <div className="section-box">
            {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && hint && (
          <>
            <div className="section-title">의미</div>
            <div className="section-box">
              {String(hint.meaning || '')
                .split('\n')
                .map((line, idx) => <div key={idx}>{line}</div>)}
            </div>

            <div className="section-title">예시</div>
            <div className="section-box" style={{ whiteSpace: 'pre-wrap' }}>
              {hint.example}
            </div>
          </>
        )}

        <button className="btn-back" onClick={handleBack}>뒤로가기</button>
      </div>
    </div>
  );
}
