export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-03-29',

  modules: ['@vite-pwa/nuxt'],

  css: ['bulma/css/bulma.min.css', '~/assets/css/main.css'],

  runtimeConfig: {
    emailVerificationSecret: process.env.EMAIL_VERIFICATION_SECRET || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFrom: process.env.RESEND_FROM || 'Prime Video <onboarding@resend.dev>',
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || '',
    },
  },

  app: {
    head: {
      title: 'Prime Video',
      htmlAttrs: {
        lang: 'pl',
      },
      meta: [
        { name: 'description', content: 'Prime Video jako instalowalna aplikacja PWA w Nuxt 4.' },
        { name: 'theme-color', content: '#07131f' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Prime Video' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/icon-192.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    filename: 'manifest.webmanifest',
    includeAssets: [
      'favicon.ico',
      'icons/icon-64.png',
      'icons/icon-128.png',
      'icons/icon-192.png',
      'icons/icon-256.png',
      'icons/icon-512.png',
    ],
    manifest: {
      id: '/',
      name: 'Prime Video',
      short_name: 'Prime Video',
      description: 'Prime Video jako instalowalna aplikacja PWA',
      theme_color: '#07131f',
      background_color: '#07131f',
      orientation: 'any',
      categories: ['entertainment', 'video', 'lifestyle'],
      lang: 'pl-PL',
      dir: 'ltr',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'standalone', 'minimal-ui', 'browser'],
      start_url: '/',
      scope: '/',
      shortcuts: [
        {
          name: 'Filmy',
          short_name: 'Filmy',
          description: 'Przejdz od razu do katalogu filmow.',
          url: '/filmy',
          icons: [
            {
              src: '/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
          ],
        },
        {
          name: 'Seriale',
          short_name: 'Seriale',
          description: 'Przejdz od razu do seriali.',
          url: '/seriale',
          icons: [
            {
              src: '/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
          ],
        },
        {
          name: 'Moja lista',
          short_name: 'Lista',
          description: 'Otworz zapamietane tytuly.',
          url: '/moja-lista',
          icons: [
            {
              src: '/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
          ],
        },
      ],
      icons: [
        {
          src: '/icons/icon-64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: '/icons/icon-128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\/[^/]+\/(?:$|filmy\/?$|seriale\/?$|moja-lista\/?$|about\/?$|watch\/.+$)/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            networkTimeoutSeconds: 3,
          },
        },
        {
          urlPattern: /^https?:\/\/[^/]+\/(?:icons|images)\/.+\.(?:png|jpg|jpeg|svg|webp)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'images',
          },
        },
        {
          urlPattern: /^https?:\/\/[^/]+\/.+\.(?:woff|woff2|ttf|otf)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})
