// src/App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Home from './Screen/Home';
import NotFoundPage from './Screen/NotFoundPage';
import SettingsPage from './Screen/Setting';
import InquiryPage from './Screen/Inquiry';
import SetNickName from './Screen/SetNickName';
import QuizCard from './Screen/QuizCards/index';
import HelpScreen from './Screen/QuizCards/HelpScreen';
import Scorescreen from './Screen/scorescreen';
import AnswerScreen from './Screen/QuizCards/AnswerScreen.jsx';
import AnswerExplain from './Screen/QuizCards/AnswerExplain.jsx';

import { useSound } from './hooks/UseSound';
import { fetchNextQuiz, submitAnswer } from './api/quizApi';

const SFX_CORRECT = encodeURI('/audio/Right answer.mp3');
const SFX_WRONG   = encodeURI('/audio/Wrong answer.mp3');

function App() {
  const [quizzes, setQuizzes]   = useState([]);
  const [idx, setIdx]           = useState(0);
  const [loading, setLoading]   = useState(true);
  const [lastMeta, setLastMeta] = useState(null);  // /next meta 저장
  const [completed, setCompleted] = useState(false); // ✅ 세션 완료 플래그

  const navigate  = useNavigate();
  const location  = useLocation();

  const playCorrect = useSound(SFX_CORRECT);
  const playWrong   = useSound(SFX_WRONG);

  /**
   * ✅ 공용 /next 로더
   * - completed 상태면 호출 자체를 막음
   * - 409가 오면 completed=true로 세팅하고 결과 화면으로
   */
  async function loadNext() {
    if (completed) return;               // 이미 완료면 아무 것도 하지 않음
    setLoading(true);
    try {
      const { quiz, meta } = await fetchNextQuiz(); // GET /next
      setQuizzes([quiz]);
      setLastMeta(meta);
      setIdx(0);
    } catch (e) {
      const s = e?.response?.status ?? e?.httpStatus;
      if (s === 409) {
        // 모든 문제 완료 → 더 이상 /next 호출 금지
        setCompleted(true);
        navigate('/scorescreen');
        return;
      }
      if (s === 401 || s === 404) {
        navigate('/'); // 세션 없음/만료
        return;
      }
      console.error('문제 불러오기 실패:', e);
    } finally {
      setLoading(false);
    }
  }

  /**
   * ✅ 라우트가 '/start/quiz'로 들어올 때만 /next 호출
   * - (중요) 새로 시작하는 흐름을 고려해 completed를 항상 false로 리셋
   *   (결과화면에서 "다시 시작/문제로" 눌러 새 세션을 연 직후 바로 로딩)
   */
  useEffect(() => {
    if (location.pathname === '/start/quiz') {
      setCompleted(false); // 새 세션 가정(또는 진행 중 세션) → 가드 해제
      loadNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /**
   * ✅ 보기 선택 → /answer POST
   */
  const handleAnswer = async (option) => {
    try {
      const res = await submitAnswer(option.option_id);
      res?.is_correct ? playCorrect() : playWrong();
      navigate('/answer', { state: res });
    } catch (e) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.message || e.message || '답안을 제출할 수 없어요.';
      if (status === 401) {
        alert(msg || '세션이 만료되었습니다. 다시 시작해 주세요.');
        navigate('/start');
        return;
      }
      alert(msg);
    }
  };

  /**
   * ✅ 결과 화면의 “다음 문제”
   * - 마지막 문제로 표시되었거나(completed / lastMeta.is_last)면
   *   더 이상 /next를 호출하지 않고 바로 결과로 이동
   */
  const handleNextFromAnswer = async () => {
    if (completed || lastMeta?.is_last) {
      navigate('/scorescreen');
      return;
    }
    await loadNext();                     // 여기에서 409면 loadNext가 내부 처리
    if (location.pathname !== '/start/quiz') {
      navigate('/start/quiz');
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

      <Route
        path="/answer"
        element={
          <AnswerScreen
            onNext={handleNextFromAnswer}
            onExplain={() => navigate('/explain')}
          />
        }
      />

      <Route path="/explain" element={<AnswerExplain />} />
      <Route path="/scorescreen" element={<Scorescreen />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
