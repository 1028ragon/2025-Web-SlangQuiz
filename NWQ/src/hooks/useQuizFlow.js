// src/hooks/useQuizFlow.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizList } from '../../../utils/quizApi';
import { shuffleArray } from '../../../utils/shuffle'; // 퀴즈 랜덤 셔플 함수

// 퀴즈 흐름 전반을 관리하는 커스텀 훅
export function useQuizFlow() {
  const navigate = useNavigate();

  
  const [quizPool, setQuizPool] = useState([]);    // 처음엔 빈 배열

  // 현재 퀴즈 인덱스를 나타내는 step 상태
  const [step, setStep] = useState(0);

  // 사용자가 선택한 보기 값을 저장하는 상태
  const [selected, setSelected] = useState('');

  // 현재 퀴즈 문제 객체
  const currentQuiz = quizPool[step];

  // 로딩 상태 관리
  const [loading, setLoading]   = useState(true);

  // ─── 여기가 핵심 ──────────────────────────────────────
  // 컴포넌트 마운트 시 한 번만 Mock API 호출
  useEffect(() => {
    fetchQuizList()
      .then(list => setQuizPool(list))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  // ──────────────────────────────────────────────────────


  // 로딩 중이라면 아래 값들만 반환(QuizCard.jsx 는 loading 체크 없이도 blank 처리됨)
  if (loading) {
    return { loading, currentQuiz: null, selected, handleAnswer: () => {}, handleNext: () => {}, handleHome: () => {} };
  }


  // 사용자가 보기를 선택했을 때 실행되는 함수
  const handleAnswer = (option) => {
    setSelected(option);      // 선택값 저장
    navigate('/answer');      // 정답 확인 화면으로 이동
  };

  // 다음 문제로 이동하는 함수
  const handleNext = () => {
    const isLast = step === quizPool.length - 1;

    if (isLast) {
      alert('퀴즈가 모두 끝났습니다!');
      setQuizPool(shuffleArray(quizData)); // 퀴즈를 새로 섞음
      setStep(0);                          // 인덱스 초기화
      setSelected('');                    // 선택 초기화
      navigate('/quiz');                  // 첫 문제로 이동
    } else {
      setStep(step + 1);                  // 다음 문제로 이동
      setSelected('');                    // 선택 초기화
      navigate('/quiz');                  // 퀴즈 화면으로 이동
    }
  };

  // 처음 화면(첫 번째 문제)으로 돌아가는 함수
  const handleHome = () => {
    setStep(0);
    setSelected('');
    navigate('/quiz');
  };

  // 이 훅에서 외부로 전달할 값들 (각 컴포넌트에서 props로 사용)
  return {
    currentQuiz,                  // 현재 문제 객체
    selected,                     // 선택된 보기
    handleAnswer,                 // 보기 선택 핸들러
    handleNext,                   // 다음 문제로 이동
    handleHome,                   // 홈(처음)으로 이동
    handleExplain: () => navigate('/explain'), // 해설 보기로 이동
    handleHelp: () => navigate('/help'),       // 도움말 보기로 이동 (선택적 사용)
  };
}
