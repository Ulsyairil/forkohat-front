export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'forkohat',
    htmlAttrs: {
      lang: 'id',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/css/dashlite.css?ver=2.9.0',
      },
      { rel: 'stylesheet', type: 'text/css', href: '/css/theme.css?ver=2.9.0' },
      // Usage : https://animate.style/
      { rel: 'stylesheet', type: 'text/css', href: '/css/animate.css' },
      // Usage : https://splidejs.com/documents/
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/css/splide/splide.min.css',
      },
      // Usage : https://dearflip.com/examples/jquery/documentation.html
      {
        rel: 'stylesheet',
        href: '/css/dflip.min.css',
      },
    ],
    script: [
      { src: '/js/bundle.js?ver=2.9.0', body: true },
      { src: '/js/scripts.js?ver=2.9.0', body: true },
      // Usage : https://gasparesganga.com/labs/jquery-loading-overlay/
      { src: '/js/vendors/jquery-loading/loadingoverlay.min.js', body: true },
      // Usage : https://splidejs.com/documents/
      { src: '/js/vendors/splide/splide.min.js', body: true },
      // Usage : https://github.com/francoischalifour/medium-zoom
      { src: '/js/vendors/medium/medium-zoom.js', body: true },
      // Usage : https://github.com/sha256/Pristine
      { src: '/js/vendors/pristine/pristine.js', body: true },
      // Usage : https://dearflip.com/examples/jquery/documentation.html
      { src: '/js/dflip.min.js', body: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    https: false,
    proxy: true,
  },

  proxy: {
    '/dev': '103.144.82.125',
    '/dev/api/v1/': '103.144.82.125',
    '/api/v1/': 'localhost:3333',
  },

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
}
