import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  extends: [
    '@thecodeorigin/nuxt',
  ],

  app: {
    head: {
      titleTemplate: '%s - A SAAS Template with Nuxt 3.',
      title: 'saas.template',
    },
  },

  runtimeConfig: {
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      appBaseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL,
    },
  },

  components: {
    dirs: [
      {
        path: '@/app/components',
        pathPrefix: false,
      },
    ],
  },

  pinia: {
    storesDirs: [
      fileURLToPath(new URL('./app/stores', import.meta.url)),
    ],
  },

  alias: {
    '@': fileURLToPath(new URL('.', import.meta.url)),
    '@stores': fileURLToPath(new URL('./app/stores', import.meta.url)),
    '@plugins': fileURLToPath(new URL('./app/plugins', import.meta.url)),
    '@utils': fileURLToPath(new URL('./app/utils', import.meta.url)),
  },

  i18n: {
    langDir: './assets/locale',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        dir: 'ltr',
        file: {
          path: 'en.json',
          cache: true,
        },
      },
      {
        code: 'vi',
        language: 'vi-VN',
        name: 'Tiếng Việt',
        dir: 'ltr',
        file: {
          path: 'vi.json',
          cache: true,
        },
      },
    ],
  },

  build: {
    transpile: [
      'shiki',
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: [
        '@base',
        '@thecodeorigin/nuxt',
        'vue-loading-overlay',
      ],
    },
  },

  modules: ['@nuxtjs/mdc'],
})
