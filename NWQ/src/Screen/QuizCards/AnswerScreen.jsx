// src/Screen/QuizCards/AnswerScreen.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import './AnswerScreen.css';

export default function AnswerScreen({ onNext, onExplain }) {
  const { state } = useLocation();          // /answer 응답 payload
  const navigate = useNavigate();
  const d = state;

  // 직접 주소로 진입했을 때 방어
  if (!d) {
    return (
      <div className="answer-container">
        <div className="answer-card">
          <p>결과 데이터가 없습니다.</p>
          <button className="btn home" onClick={() => navigate('/start/quiz')}>
            문제로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const {
    message = '',
    is_correct = false,
    option_text = '',
    option_meaning = '',
    example_text = '',
    image_url,
  } = d;

  const hasMeaning = typeof option_meaning === 'string' && option_meaning.trim().length > 0;
  const hasExample = typeof example_text === 'string' && example_text.trim().length > 0;

  // ✅ 해설 버튼 기본 동작: onExplain 있으면 호출, 없으면 /explanation 으로 이동
  const handleExplain = () => {
    if (typeof onExplain === 'function') {
      onExplain();
    } else {
      navigate('/explanation'); // 라우트를 /explain으로 쓰고 있다면 이 경로만 바꿔주세요.
    }
  };

  return (
    <div className="answer-container">
      <div className="answer-card">
        {/* O/X 아이콘 + 결과 텍스트 */}
        <div className={`ox-symbol ${is_correct ? 'circle' : 'cross'}`}>
          {is_correct ? '○' : '×'}
        </div>
        <div
          className="result-text"
          style={{ color: is_correct ? '#2F00FF' : '#b42318' }}
        >
          {message}
        </div>

        {/* 퀴즈 이미지(선택) */}
        {image_url ? (
          <img src={image_url} alt="quiz" className="quiz-image" />
        ) : null}

        {/* 정답 */}
        <div className="section-title">정답</div>
        <div className="section-box">{option_text || '—'}</div>

        {/* 의미 */}
        <div className="section-title">의미</div>
        <div className="section-box" style={{ whiteSpace: 'pre-wrap' }}>
          {hasMeaning ? option_meaning : '설명 없음'}
        </div>

        {/* 예문 */}
        <div className="section-title">예문</div>
        <div className="section-box" style={{ whiteSpace: 'pre-wrap' }}>
          {hasExample ? example_text : '예문 없음'}
        </div>

        {/* 버튼들 */}
        <div className="button-group">

          <button className="btn next" onClick={onNext}>
            다음 문제
          </button>
          {/* ✅ 항상 보이게 */}
          <button className="btn explain" onClick={handleExplain}>
            해설
          </button>
        </div>
      </div>
    </div>
  );
}
