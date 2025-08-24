// src/App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './Screen/Home';
import NotFoundPage from './Screen/NotFoundPage';
import SettingsPage from './Screen/Setting';
import InquiryPage from './Screen/Inquiry';
import SetNickName from './Screen/SetNickName';
import QuizCard from './Screen/QuizCards/index';
import HelpScreen from './Screen/QuizCards/HelpScreen';
import Scorescreen from './Screen/scorescreen';
import AnswerScreen from './Screen/QuizCards/AnswerScreen.jsx';
import AnswerExplain from './Screen/QuizCards/AnswerExplain.jsx'; // ✅ 해설 화면

import { fetchNextQuiz, submitAnswer } from './api/quizApi';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 최초 1문제 로드
  useEffect(() => {
    (async () => {
      try {
        const { quiz } = await fetchNextQuiz();
        setQuizzes([quiz]); // 배열 형태 유지
      } catch (err) {
        console.error('퀴즈 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 보기 클릭 → /answer POST
  const handleAnswer = async (option) => {
    try {
      const res = await submitAnswer(option.option_id); // { status, message, is_correct, ... }
      navigate('/answer', { state: res }); // 응답을 상태로 전달
    } catch (e) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.message || e.message || '답안을 제출할 수 없어요.';
      if (status === 401) {
        alert(msg || '세션이 만료되었습니다. 다시 시작해 주세요.');
        navigate('/start');
        return;
      }
      alert(msg); // 409 등 공통 처리
    }
  };

  // 결과 화면의 “다음 문제”
  const handleNextFromAnswer = async () => {
    try {
      const { quiz } = await fetchNextQuiz();
      setQuizzes([quiz]); // 새 문제 교체
      setIdx(0);
      navigate('/start/quiz');
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        navigate('/start');
        return;
      }
      console.error('다음 문제 로드 실패:', e);
      alert('다음 문제를 불러오지 못했습니다.');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/requests" element={<InquiryPage />} />
      <Route path="/start" element={<SetNickName />} />
      <Route path="/help" element={<HelpScreen />} />

      <Route
        path="/start/quiz"
        element={
          loading ? (
            <div>퀴즈 데이터를 불러오는 중입니다...</div>
          ) : (
            <QuizCard quiz={quizzes[idx]} onAnswer={handleAnswer} />
          )
        }
      />

      {/* 결과 화면 */}
      <Route
        path="/answer"
        element={
          <AnswerScreen
            onNext={handleNextFromAnswer}
            onExplain={() => navigate('/explain')} // ✅ 해설 버튼 동작
          />
        }
      />

      {/* ✅ 해설 화면 */}
      <Route path="/explain" element={<AnswerExplain />} />

      <Route path="/ScoreScreen" element={<Scorescreen />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
