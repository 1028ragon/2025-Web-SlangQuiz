import axios from 'axios';

// 1. axios 인스턴스 생성
// API 요청의 기본 URL과 공통 설정을 관리합니다.
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL,

    // ✅ 2. 쿠키를 주고받기 위한 필수 설정
    // 이 옵션이 true로 설정되어야 브라우저가 서버로부터 받은 쿠키를 저장하고,
    // 이후의 요청에 자동으로 포함하여 전송합니다.
    // 클라이언트와 서버의 도메인이 다른 경우(CORS)에 반드시 필요합니다.
    withCredentials: true, 
});
export const submitNicknameApi = (trimmedNickname) => {
    // POST 요청으로 '/users/nickname' 엔드포인트에 닉네임 데이터를 전송합니다.
    // 실제 엔드포인트는 서버 API 명세에 맞게 수정해야 합니다.
    return apiClient.post('/start', {'nickname':trimmedNickname});
};
