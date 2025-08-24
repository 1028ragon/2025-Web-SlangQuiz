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

// 정답 제출 (명세: POST /answer { option_id })
export async function submitAnswer(option_id) {
  if (option_id == null) throw new Error('option_id is required');
  const { data } = await http.post('/answer', { option_id }); // => /api/answer, 쿠키 자동 포함
  // data: { status, message, is_correct, selected_option_id, quiz_order, quiz_id,
  //         option_id, option_text, option_meaning, example_text }
  return data;
}

export async function fetchHint() {
  const { data } = await http.get('/hint'); // => /api/hint 로 프록시, 쿠키 자동 포함
  // 상태 코드에 따른 처리
  if (data?.status !== 200) {
    const err = new Error(data?.message || '힌트 조회 실패');
    err.response = { status: data?.status, data };
    throw err;
  }
  // 사용하기 좋게 필드 매핑
  return {
    status: data.status,
    message: data.message,
    quiz_order: data.quiz_order,
    quiz_id: data.quiz_id,
    hint_text: data.hint_text,
    example_text: data.example_text,
  };
}


// ⬇️ 오답 해설 조회
export async function fetchExplanation() {
  const { data: d } = await http.get('/explanation'); // => /api/explanation 로 프록시
  return {
    quiz_order: d.quiz_order,
    quiz_id: d.quiz_id,
    explanations:
      (d.explanations ?? []).map((o) => ({
        option_id: o.option_id,
        option_text: o.option_text,
        option_meaning: o.option_meaning,
      })) ?? [],
    message: d.message,
    status: d.status,
  };
}
