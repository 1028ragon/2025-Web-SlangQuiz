import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // 서비스워커 자동 업데이트
      registerType: 'autoUpdate',
      // 빌드에 같이 넣어(사전캐시)둘 정적 리소스
      includeAssets: [
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/apple-touch-icon-180.png',
        // 작은 효과음 정도는 같이 캐싱해도 OK (용량 너무 크면 빼세요)
        'audio/Right answer.mp3',
        'audio/Wrong answer.mp3',
        'audio/Score.mp3',
      ],
      // manifest.json
      manifest: {
        name: '신조어 퀴즈',
        short_name: '신조어퀴즈',
        description: '신조어 퀴즈 PWA',
        start_url: '/',     // Vercel 루트에 배포할 거라면 '/'가 맞습니다
        scope: '/',
        display: 'standalone',
        background_color: '#60c6de',
        theme_color: '#60c6de',
        lang: 'ko',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          // 같은 512를 maskable로 재사용
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      // 오프라인/캐싱 전략
      workbox: {
        // ← 이 줄 추가 (6MB 예시)
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,png,svg,mp3}'],
        runtimeCaching: [
          // 정적 리소스(이미지/폰트/오디오)는 캐시 우선
          {
            urlPattern: ({ request }) =>
              ['image', 'font', 'audio'].includes(request.destination),
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          // API는 온라인 우선 (쿠키 쓰면 캐싱이 꼬일 수 있으니 무리하지 않음)
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              fetchOptions: { credentials: 'include' }, // withCredentials 대응
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 },
            },
          },
        ],
      },
      // 개발중에도 PWA 동작 확인(원할 때만 켜세요)
      devOptions: { enabled: true },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://13.209.74.70:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        cookieDomainRewrite: 'localhost',
        cookiePathRewrite: '/',
      },
    },
  },
});