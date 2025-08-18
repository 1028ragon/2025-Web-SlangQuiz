import quizData from '../data/quizData';   // quizData.js 에 있는 임시 배열
import QuizDTO from '../NWQ/src/api/QuizDTO';
import { shuffleArray } from './shuffle';

/** 전체 퀴즈 리스트를 Promise 로 반환하는 Mock API */
export function fetchQuizList() {
  return new Promise(resolve => {
    const shuffled = shuffleArray(quizData);
    const dtos = shuffled.map(q =>
      new QuizDTO(q.quiz_id, q.quiz_text, q.image_url, q.options)
    );
    resolve(dtos);
  });
}

/** id 기반 단일 퀴즈 조회 (Mock) */
export function fetchQuizById(id) {
  return new Promise((resolve, reject) => {
    const raw = quizData.find(q => String(q.quiz_id) === String(id));
    if (!raw) return reject(new Error('Quiz not found'));
    resolve(
      new QuizDTO(raw.quiz_id, raw.quiz_text, raw.image_url, raw.options)
    );
  });
}