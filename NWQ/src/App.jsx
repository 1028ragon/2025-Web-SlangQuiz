// App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Screen/Home';
import NotFoundPage from './Screen/NotFoundPage';
import SettingsPage from './Screen/Setting';
import InquiryPage from './Screen/Inquiry';
import SetNickName from './Screen/SetNickName';
import QuizCard from './Screen/QuizCards/index';
import HelpScreen from './Screen/QuizCards/HelpScreen';
import Scorescreen from './Screen/scorescreen';
import { fetchNextQuiz, submitAnswer } from './api/quizApi'; // API 연동 추가

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuizzes() {
   try {
      const { quiz, meta } = await fetchNextQuiz(); // fetchQuizList → fetchNextQuiz 로 변경
      setQuizzes([quiz]); // 배열로 맞춰줌
      setLoading(false);
   } catch (err) {
      console.error("퀴즈 불러오기 실패:", err);
      setLoading(false);
   }
}
    loadQuizzes();
  }, []);

  const handleAnswer = (optionId) => {
    setIdx(i => Math.min(i + 1, quizzes.length - 1));
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
      <Route path="/ScoreScreen" element={<Scorescreen />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
