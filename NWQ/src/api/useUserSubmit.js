import axios from 'axios';

// 이 함수는 성공/실패 여부만 알려주거나, 데이터를 반환합니다.
export const submitNicknameApi = (nickname) => {
const API_URL = import.meta.env.VITE_API_SERVER_URL
    return axios.post(`${API_URL}/start`, {nickname}, { withCredentials: true });
}