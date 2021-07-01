export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Forum Kota Sehat Balikpapan',
    htmlAttrs: {
      lang: 'id',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto',
      },
      {
        // Usage : https://animate.style/
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/aos@2.3.1/dist/aos.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
      },
      {
        rel: 'stylesheet',
        href: '/css/dflip.min.css',
      },
      {
        rel: 'stylesheet',
        href: '/css/themify-icons.min.css',
      },
      {
        rel: 'stylesheet',
        href: '/css/owl.carousel.min.css',
      },
      {
        rel: 'stylesheet',
        href: '/css/owl.theme.default.min.css',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        integrity:
          'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49',
        crossorigin: 'anonymous',
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        integrity:
          'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy',
        crossorigin: 'anonymous',
      },
      {
        // Usage : https://github.com/sha256/Pristine
        src: '/js/pristine.js',
      },
      {
        // Usage : https://gasparesganga.com/labs/jquery-loading-overlay/
        src:
          'https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js',
      },
      {
        src: '/js/zoom.js',
      },
      {
        // Usage : https://michalsnik.github.io/aos/
        src: 'https://unpkg.com/aos@2.3.1/dist/aos.js',
      },
      // https://developers.google.com/recaptcha/docs/display
      { src: 'https://www.google.com/recaptcha/api.js' },
      {
        src: '/js/dflip.min.js',
      },
      {
        src: '/js/owl.carousel.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/transition-page.scss',
    '~/assets/zoom.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // Usage : https://www.npmjs.com/package/vue-js-toggle-button
    { src: '~/plugins/vue-toogle-btn.js', mode: 'client' },
    // Usage : https://www.npmjs.com/package/@fortawesome/vue-fontawesome
    { src: '~/plugins/fontawesome.js' },
    // Usage : https://www.npmjs.com/package/vue-loading-skeleton
    { src: '~/plugins/vue-skeleton.js' },
    // Usage : https://www.vue2editor.com/
    { src: '~/plugins/vue2editor.js', mode: 'client' },
    // Source : https://github.com/surmon-china/vue-awesome-swiper
    // Usage : https://github.surmon.me/vue-awesome-swiper/?ref=madewithvuejs.com
    { src: '~/plugins/vue-awesome-swiper.js', mode: 'client' },
    // Usage : https://www.npmjs.com/package/vue-notification
    { src: '~/plugins/vue-notification.js', mode: 'client' },
    { src: '~/plugins/grid-vue.js', mode: 'client' },
    { src: '~/plugins/vue-splide.js', mode: 'client' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Usage : https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // Usage : https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Usage : https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    // Usage : https://www.npmjs.com/package/@nuxtjs/recaptcha
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
        siteKey: '6Lc1Sc8aAAAAAICyCx66QIuP7qB-XAAQDbIDj1ly', // Site key for requests
        version: 3, // Version
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
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

  // Public env variable
  publicRuntimeConfig: {
    // baseurl: 'http://127.0.0.1:3333/api/v1',
    // domain: 'http://127.0.0.1:3333',
    baseurl: 'https://apiforkohat.balikpapanpedia.com/api/v1',
    domain: 'https://apiforkohat.balikpapanpedia.com',
  },

  // Change server port
  server: {
    port: 49001, // default: 3000
  },
}
