// src/api/https.js
import axios from 'axios';

const http = axios.create({
  baseURL: '/api',            // 프록시 타도록
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export default http;
