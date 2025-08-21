import axios from 'axios';

// 1. axios 인스턴스 생성
// API 요청의 기본 URL과 공통 설정을 관리합니다.
const apiClient = axios.create({
    // 🚨 API 서버의 기본 URL을 실제 환경에 맞게 수정해주세요.
    // 예: baseURL: 'http://localhost:8080/api'
    baseURL: 'http://13.209.74.70:8080',

    // ✅ 2. 쿠키를 주고받기 위한 필수 설정
    // 이 옵션이 true로 설정되어야 브라우저가 서버로부터 받은 쿠키를 저장하고,
    // 이후의 요청에 자동으로 포함하여 전송합니다.
    // 클라이언트와 서버의 도메인이 다른 경우(CORS)에 반드시 필요합니다.
    withCredentials: true, 
});

/**
 * 닉네임 제출 API 함수
 * @param {{ nickname: string }} data - 전송할 닉네임 데이터
 */
export const submitNicknameApi = (data) => {
    // POST 요청으로 '/users/nickname' 엔드포인트에 닉네임 데이터를 전송합니다.
    // 실제 엔드포인트는 서버 API 명세에 맞게 수정해야 합니다.
    return apiClient.post('/start', data); 
};

