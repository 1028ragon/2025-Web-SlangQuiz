import QuizDTO from './QuizDTO';
import http from "./https.js"; // 확장자 써주는 게 확실합니다

const API_BASE = import.meta.env.VITE_API_SERVER_URL || 'http://13.209.74.70:8080';

// 필요하면 전역 설정도 가능
// axios.defaults.withCredentials = true;

const toQuizDTO = (d) =>
  new QuizDTO(
    d.quiz_id,
    d.quiz_text,
    d.image_url,
    (d.options ?? []).map(o => ({ option_id: o.option_id, option_text: o.option_text }))
  );

// --- (안 쓰면 지우거나 주석) ---
// export async function fetchQuizList() { ... }
// export async function fetchQuizById(id) { ... }

// 다음 문제 1개
// quizApi.js (요지)
export async function fetchNextQuiz() {
  const { data: d } = await http.get('/next');
  const quizDTO = new QuizDTO(
    d.quiz_id,
    d.quiz_text,
    d.image_url,
    d.options?.map(o => ({ option_id: o.option_id, option_text: o.option_text })) ?? []
  );
  return {
    quiz: quizDTO,
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

export async function submitAnswer(option_id) {
  const { data } = await http.post('/answer', { option_id });
  return data;
}
