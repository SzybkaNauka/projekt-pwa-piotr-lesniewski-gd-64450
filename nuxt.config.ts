export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vite-pwa/nuxt'],

  css: [],

  app: {
    head: {
      title: 'StreamBox',
      htmlAttrs: {
        lang: 'pl',
      },
      meta: [
        { name: 'description', content: 'Nowoczesna aplikacja streamingowa w Nuxt 4 i PWA.' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/icon-192.png' },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'StreamBox',
      short_name: 'StreamBox',
      description: 'Aplikacja streamingowa w stylu premium',
      theme_color: '#07131f',
      background_color: '#07131f',
      display: 'standalone',
      start_url: '/',
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
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})