// src/api/quizApi.js
import QuizDTO from './QuizDTO';
import http from './https.js';

// 다음 문제 1개
export async function fetchNextQuiz() {
  const { data: d } = await http.get('/next');
  const quiz = new QuizDTO(
    d.quiz_id,
    d.quiz_text,
    d.image_url,
    (d.options ?? []).map(o => ({ option_id: o.option_id, option_text: o.option_text }))
  );
  return {
    quiz,
    meta: {
      quiz_order: d.quiz_order,
      answered_count: d.answered_count,
      remaining_count: d.remaining_count,
      is_last: d.is_last,
      message: d.message,
      status: d.status,
    },
  };
}

// ✅ 정답 제출 (App.jsx에서 import { submitAnswer } ... 로 쓰는 그 함수)
export async function submitAnswer(option_id) {
  if (option_id == null) throw new Error('option_id is required');
  const { data } = await http.post('/answer', { option_id });
  return data; // 서버 응답 형태 그대로 반환
}

// 필요하면 힌트도 함께
export async function fetchHint() {
  const { data } = await http.get('/hint');
  return data;
}
