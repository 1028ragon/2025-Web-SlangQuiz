import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프런트에서 요청은 /api 로 보내고
      // 백엔드로는 / 로 전달되도록 rewrite
      '/api': {
        target: 'http://13.209.74.70:8080', // 백엔드 주소
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),

        // ★ 쿠키 도메인을 localhost 로 바꿔서 브라우저가 저장하게 함
        cookieDomainRewrite: 'localhost',
        // 필요하면 경로도 루트로 맞춤
        cookiePathRewrite: '/'
      }
    }
  }
});
