import colors from 'vuetify/es5/util/colors'

let dropConsole = {}
const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  dropConsole = {
    compress: {
      drop_console: true,
    },
  }
}

// Change this url if you have another host
const axiosBaseUrl = "http://forkohat-app.local/api/v1";
const serverBaseUrl = "http://forkohat-app.local"

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Forum Kota Sehat Balikpapan',
    title: 'Forum Kota Sehat Balikpapan',
    htmlAttrs: {
      lang: 'id',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/dflip/css/dflip.min.css' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/dflip/css/themify-icons.min.css',
      },
    ],
    script: [
      {
        src: '/dflip/js/libs/jquery.min.js',
      },
      {
        src: '/dflip/js/dflip.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/node_modules/material-icons/iconfont/material-icons.css',
    '@/node_modules/hover.css/css/hover-min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/client-side.js', mode: 'client' },
    { src: '~/plugins/server-side.js', mode: 'server' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Usage : https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Usage : https://auth.nuxtjs.org/
    '@nuxtjs/style-resources',
    // Usage : https: www.npmjs.com/package/nuxt-vuex-localstorage
    ['nuxt-vuex-localstorage'],
    // Usage : https://www.vue2editor.com/guide.html
    'vue2-editor/nuxt',
    // Usage : https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: axiosBaseUrl,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      // See : https://github.com/terser/terser#compress-options
      terserOptions: {
        dropConsole,
      },
    },
    watch: ['api']
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Default target is static
  target: 'server',

  // Default loading is false
  loading: true,

  // Change server port
  server: {
    // port: 49001, // default: 3000
    host: "",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken2,
          secondary: colors.amber.darken2,
          info: colors.teal.darken1,
          warning: colors.amber.darken1,
          error: colors.red.darken4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.blue.lighten1,
          accent: colors.grey.lighten1,
          secondary: colors.amber.lighten1,
          info: colors.teal.lighten1,
          warning: colors.amber.lighten1,
          error: colors.red.accent4,
          success: colors.green.lighten1,
        },
      },
      icons: {
        iconfont: 'md',
      },
    },
  },

  // Nuxt auth configuration : https://auth.nuxtjs.org/guide/scheme
  auth: {
    redirect: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 31536000,
          global: true,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
          tokenRequired: true,
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          refresh: { url: '/refresh-token', method: 'post' },
          user: { url: '/me', method: 'get' },
        },
      },
    },
  },

  // Nuxt env configuration : https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  env: {
    serverBaseUrl: serverBaseUrl,
  },

  // Server Middleware: https://nuxtjs.org/docs/configuration-glossary/configuration-server-middleware/
  serverMiddleware: [
    // 'redirect-ssl',
    { path: '/api', handler: '~/api/index.js' },
  ],

  // Middleware
  middleware: ['ssr-cookie'],
}
