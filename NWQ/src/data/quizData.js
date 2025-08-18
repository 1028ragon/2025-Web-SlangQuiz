// src/data/quizData.js
import QuizDTO from '../api/QuizDTO';

const rawQuizData = [
  {
    quiz_id: 1,
    quiz_text: '그림이 설명하는 신조어는?',
    image_url: '/images/quiz1.png',
    options: [
      { option_id: 101, option_text: '점메추' },
      { option_id: 102, option_text: '혼밥' },
      { option_id: 103, option_text: '밥터디' },
      { option_id: 104, option_text: '밥약' },
    ],
  },
  {
    quiz_id: 2,
    quiz_text: '그림이 설명하는 신조어는?',
    image_url: '/images/quiz2.png',
    options: [
      { option_id: 201, option_text: '넥슨넥카엔' },
      { option_id: 202, option_text: '네카라쿠배당토' },
      { option_id: 203, option_text: '빅테삼' },
      { option_id: 204, option_text: '삼엘하' },
    ],
  },
  {
    quiz_id: 3,
    quiz_text: '그림이 설명하는 신조어는?',
    image_url: '/images/quiz3.png',
    options: [
      { option_id: 301, option_text: '킹받네' },
      { option_id: 302, option_text: '현타' },
      { option_id: 303, option_text: '억까' },
      { option_id: 304, option_text: '멘붕' },
    ],
  }
];

const quizList = rawQuizData.map(q =>
  new QuizDTO(q.quiz_id, q.quiz_text, q.image_url, q.options)
);

export default quizList;
