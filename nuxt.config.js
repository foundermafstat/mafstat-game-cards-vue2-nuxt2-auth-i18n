import axios from 'axios'
import languages from './static/lang/languages'

module.exports = {
  // Указываем порт, на котором будет работать приложение.
  server: {
    port: process.env.PORT,
    host: "localhost",
  },

  loading: { color: '#fff', height: '1px' },
  // Передаём во фронт данные из .env. Эта переменная будет доступна через process.env.baseUrl.
  // Важно! Эти данные будут видны в коде сайта. Не передавайте таким образом пароли и т.д.
  // Если данные есть в .env, но их не передали на фронт, то их нет в коде сайта, они доступны только в бэкенде.
  env: {
    baseUrl: process.env.BASE_URL,
  },

  // Глобальные настройки секции Head. Можно прописать общие мета-теги, атрибуты и прочее.
  head: {
    htmlAttrs: { 
      dir: 'ltr'
    },
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
    ],
  },

  // Включаем автоматическое подключение компонентов.
  components: false,

  // Отключаем передачу анонимных данных о работе приложения в Nuxt.
  telemetry: false,

  // Отключаем предварительную загрузку контента, на который есть ссылки на текущей страницы.
  router: { prefetchLinks: true },

  //Подключаем proxy от axios и прописывам базовый URL для пути /api/
  axios: {
    proxy: true,
  },

  proxy: {
    "/api/": process.env.BASE_URL
  },

  pwa: {
    /*
    ** Headers
    ** Common headers are already provided by @nuxtjs/pwa preset
    */

    title: 'MafStat',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-starturl', content: '/' },
      { name: 'msapplication-starturl', content: '/' }
    ],

    icon: {
      source: '/favicon.png',
      fileName: 'favicon.png',
    },

    /*
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff', height: '1px' },
    loadingIndicator: {
      name: 'circle',
      color: '#ff3333',
    },
    transition: {
      name: 'page'
    },
    /*
    ** Customize app manifest
    */
    manifest: {
      lang: 'en',
      name: 'MafStat - игра мафия, фиим, рейтинг, статистика, поиграть в мафию',
      short_name: 'MafStat',

      description: 'Интеллектуальная игра мафия, фиим, рейтинг, статистика, поиграть в мафию',

      theme_color: '#ff0f0f',
      background_color: '#ff0f0f',
      display: 'fullscreen',
      orientation: 'portrait',
      start_url: "/",
    },
  },

  // Плагины
  plugins: [
    //{ src: "@/plugins/vue-apexcharts", ssr : false },
    { src: "@/plugins/countryflag.js", mode: 'client'  },
    { src: "@/plugins/vuetify.js", mode: 'client'  },
  ],

  //Подключаем модуль Axios для выполнения запросов к бэкенду.
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/i18n",
    "@nuxtjs/axios",
    "@nuxtjs/vuetify",
    "@nuxtjs/sitemap",
    "@nuxtjs/auth-next",
  ],

  //Подключаем общий файл со стилями.
  css: [
    "@/assets/css/fonts.css",
    "@/assets/css/reset.css",
    "@/assets/css/main.css",
  ],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'token',
          //autoFetch: false
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'delete' },
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
      callback: '/oidc-callback',
    },
  },

  i18n: {
    locales: languages,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true
    },
    langDir: 'static/lang/',
    noPrefixDefaultLocale: true,
  },

  vuetify: {
    optionsPath: './vuetify.options.js',
  },

  robots: {
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`
  },

  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
    exclude: [
      '/games/create',
      '/cards',
      '/ratings/create',
      '/testrating',
      '/apex'
    ],
    routes: async () => {
      let { games } = await axios.get(`${process.env.BASE_URL}/api/games`)
      console.log(games)
    }
  },

  buildModules: ['@nuxtjs/vuetify'],

  build: {
    // Просим стили вырезать в отдельные файлы. Иначе css будет inline.
    extractCSS: true,
    transpile: [
      'vuetify'
    ],

    /*
     ** You can extend webpack config here
     */

  },
}
