// src/Screen/QuizCards/HelpScreen.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HelpScreen.css';
import { fetchHint } from '../../api/quizApi'; // 기존 그대로

export default function HelpScreen() {
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // ✅ 퀴즈 화면에서 넘어온 이미지 URL 받기
  const { state } = useLocation();
  const imageUrl = state?.image_url || null;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const d = await fetchHint(); // { status, message, quiz_order, quiz_id, hint_text, example_text, ... }
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
        if (st === 401) {
          alert(msg || '세션이 만료되었습니다. 다시 시작해 주세요.');
          navigate('/start');
          return;
        }
        setErrorMsg(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [navigate]);

  const handleBack = () => navigate(-1);

  return (
    <div className="help-container">
      <div className="help-card">
        <div className="help-title">도움말</div>

        {/* ✅ 이미지(있을 때만) */}
        {imageUrl && (
          <img src={imageUrl} alt="quiz" className="help-image" />
        )}

        {loading && (
          <div className="section-box" style={{ textAlign: 'center', fontWeight: 'bold' }}>
            로딩 중…
          </div>
        )}

        {!loading && errorMsg && (
          <div className="section-box">{errorMsg}</div>
        )}

        {!loading && !errorMsg && hint && (
          <>
            <div className="section-title">의미</div>
            <div className="section-box" style={{ whiteSpace: 'pre-wrap' }}>
              {(hint.meaning || '').split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </div>

            {/* 예시 부분 백엔드 괄호 수정 안됐어서 일단 뺌*/}

            {/* <div className="section-title">예시</div>
            <div className="section-box" style={{ whiteSpace: 'pre-wrap' }}>
              {hint.example}
            </div> */} 
          </>
        )}

        <button className="btn-back" onClick={handleBack}>뒤로가기</button>
      </div>
    </div>
  );
}
