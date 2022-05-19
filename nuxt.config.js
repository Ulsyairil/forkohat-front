import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Forum Kota Sehat Balikpapan',
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/node_modules/material-icons/iconfont/material-icons.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vuelidate.js'],

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
    // Usage : https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://127.0.0.1:3333/api/v1',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      // See : https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Default target is static
  target: 'server',

  // Default loading is false
  loading: false,

  // Change server port
  server: {
    // port: 49001, // default: 3000
    // host: "192.168.1.2",
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
}
