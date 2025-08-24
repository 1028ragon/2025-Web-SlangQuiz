import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scorescreen.css';
import ScoreImage from './scoreimage';
import { fetchResult } from '../../api/quizApi';

export default function ScoreScreen() {
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('플레이어');
  const [answeredCount, setAnsweredCount] = useState(0); // 옵션
  const [totalCount, setTotalCount] = useState(20);      // 옵션

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const d = await fetchResult();           // ✅ GET /result
        setPlayerName(d.nickname ?? '플레이어');
        setScore(Number(d.score) || 0);
        setAnsweredCount(Number(d.answered_count) || 0);
        setTotalCount(Number(d.total_count) || 20);
      } catch (e) {
        const s = e?.response?.status ?? e?.httpStatus;
        if (s === 409) return navigate('/start/quiz'); // 아직 미완료 → 퀴즈로
        if (s === 401 || s === 404) return navigate('/'); // 세션 없음/만료 → 홈
      }
    })();
  }, [navigate]);

  const handleRetryClick = () => navigate('/start/quiz');

  return (
    <div className="score-container">
      {/* 유저 이름 */}
      <div id="name-id">{playerName}님!</div>

      {/* 점수 일러스트 */}
      <ScoreImage score={score} />

      <div className="score-one-line">
        <span id="now-score">{score}</span>
        <span id="basic-score">점</span>
      </div>




      {/* 다시하기 / 홈 / 설정 */}
      <button className="retry-button" onClick={handleRetryClick}>다시하기</button>

      <Link to="/" className="home-button"><span>홈</span></Link>
      <Link to="/settings" className="setting-button"><span>설정</span></Link>

      <div className="back-rectangle"></div>
    </div>
  );
}
