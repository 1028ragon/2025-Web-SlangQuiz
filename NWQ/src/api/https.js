import axios from 'axios';

const isProd = import.meta.env.PROD;

// dev: VITE_API_SERVER_URL 있으면 그걸 쓰고, 없으면 vite dev proxy('/api')
// prod: 무조건 '/api' (Vercel이 /api를 https://api.slangquiz.shop 으로 프록시)
const baseURL = isProd
  ? '/api'
  : (import.meta.env.VITE_API_SERVER_URL || '/api');

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  // timeout: 10000, // 필요하면 추가
});

export default http;