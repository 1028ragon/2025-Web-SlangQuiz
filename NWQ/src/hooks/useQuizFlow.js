// src/hooks/useQuizFlow.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNextQuiz } from '../api/quizApi'; // ✅ 경로 수정 (hooks → api)
import { shuffleArray } from '../utils/shuffle'; // 쓰고 있으면 유지, 안 쓰면 제거


// 퀴즈 흐름을 관리하는 커스텀 훅
export function useQuizFlow() {
  const navigate = useNavigate();

  // 기존 구조 최대한 유지
  const [quizPool, setQuizPool] = useState([]); // 이제 사용 안 하지만 최소 변경 위해 둠
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);

  // ✅ 핵심: /next 호출
  const loadNext = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { quiz, meta } = await fetchNextQuiz();
      setCurrentQuiz(quiz);
      setMeta(meta);
      setStep(meta?.quiz_order ?? 0); // UI에서 쓰면 유지
    } catch (e) {
      console.error('[next] error', e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // 마운트 시 1회 호출 (기존 mock 호출 제거)
  useEffect(() => {
    loadNext();
  }, [loadNext]);

  if (loading) {
    return {
      loading: true,
      currentQuiz: null,
      selected: '',
      handleAnswer: () => {},
      handleNext: () => {},
      handleHome: () => {},
    };
  }

  // 보기 선택 → 기존 흐름 유지
  const handleAnswer = (option) => {
    setSelected(option);
    navigate('/answer');
  };

  // 다음 문제 → /next 다시 호출
  const handleNext = async () => {
    if (meta?.is_last) {
      alert('퀴즈가 모두 끝났습니다!');
      // 종료 처리는 원하는 화면으로 이동
      // navigate('/score');  // 점수 화면이 있으면 여기로
      // 재시작하려면 아래처럼:
      setSelected('');
      setStep(0);
      await loadNext();
      navigate('/quiz');
      return;
    }
    setSelected('');
    await loadNext();
    navigate('/quiz');
  };

  // 첫 화면(퀴즈)로 돌아가기
  const handleHome = () => {
    setSelected('');
    navigate('/quiz');
  };

  return {
    currentQuiz,
    step,
    selected,
    loading: false,
    error,
    handleAnswer,
    handleNext,
    handleHome,
    handleExplain: () => navigate('/explain'),
    handleHelp: () => navigate('/help'),
  };
}

export default useQuizFlow;
