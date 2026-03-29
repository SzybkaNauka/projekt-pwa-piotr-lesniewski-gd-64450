export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-03-29',

  modules: ['@vite-pwa/nuxt'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'StreamBox',
      htmlAttrs: {
        lang: 'pl',
      },
      meta: [
        { name: 'description', content: 'Nowoczesna aplikacja streamingowa PWA w Nuxt 4.' },
        { name: 'theme-color', content: '#07131f' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'StreamBox' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/icon-192.png' },
        { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      id: '/',
      name: 'StreamBox',
      short_name: 'StreamBox',
      description: 'Nowoczesna aplikacja streamingowa',
      theme_color: '#07131f',
      background_color: '#07131f',
      orientation: 'portrait',
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
          src: '/icons/icon-192.png',
          sizes: '192x192',
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
      navigateFallback: '/',
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
