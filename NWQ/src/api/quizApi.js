// src/api/quizApi.js
import axios from 'axios';
import QuizDTO from './QuizDTO'; // 경로는 실제 위치에 맞게
// 환경변수로 API 주소를 관리 (없으면 기본 서버 주소 사용)
const API_BASE = import.meta.env.VITE_API_SERVER_URL;

/** 전체 퀴즈 리스트를 가져오는 API */
export async function fetchQuizList() {
  try {
    const res = await axios.get(`${API_BASE}/quizzes`, {
      withCredentials: true,
    });
    const data = res.data;

    // QuizDTO 인스턴스로 감싸기
    return data.map(q => new QuizDTO(q.quiz_id, q.quiz_text, q.image_url, q.options));
  } catch (err) {
    console.error('[fetchQuizList] API 호출 실패:', err);
    throw err;
  }
}

/** 단일 퀴즈 조회 (id 기반) */
export async function fetchQuizById(id) {
  try {
    const res = await axios.get(`${API_BASE}/quizzes/${id}`, {
      withCredentials: true,
    });
    const q = res.data;

    return new QuizDTO(q.quiz_id, q.quiz_text, q.image_url, q.options);
  } catch (err) {
    console.error(`[fetchQuizById] id=${id} 호출 실패:`, err);
    throw err;
  }
}
