import axios from 'axios';

// 이 함수는 성공/실패 여부만 알려주거나, 데이터를 반환합니다.
export const submitNicknameApi = (nickname) => {
    return axios.post('http://localhost:5000/start', { nickname }, { withCredentials: true });
}