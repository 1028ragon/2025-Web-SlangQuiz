// App.jsx
import { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Screen/Home';
import NotFoundPage from './Screen/NotFoundPage';
import SettingsPage from './Screen/Setting';
import InquiryPage from './Screen/Inquiry';
import SetNickName from './Screen/SetNickName';
import QuizCard from './Screen/QuizCards/index'; // 파일 경로 정확히
import quizData from './data/quizData';            // mock 데이터
import QuizDTO from './api/QuizDTO';
import HelpScreen from './Screen/QuizCards/HelpScreen';
function App() {
  const quizzes = useMemo(
    () => quizData.map(q => new QuizDTO(q.quiz_id, q.quiz_text, q.image_url, q.options)),
    []
  );
  const [idx, setIdx] = useState(0);

  const handleAnswer = (optionId) => {
    // 정답 처리 → 다음 문제로
    setIdx(i => Math.min(i + 1, quizzes.length - 1));
  };

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/settings" element={<SettingsPage/>}/>
      <Route path="/requests" element={<InquiryPage/>}/>
      <Route path="/start" element={<SetNickName/>}/>
      <Route path="/help" element={<HelpScreen/>}/>
      <Route
        path="/start/quiz"
        element={<QuizCard quiz={quizzes[idx]} onAnswer={handleAnswer} />}
      />
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}
export default App;
