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
        // https://animate.style/
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.quilljs.com/1.3.6/quill.snow.css',
      },
      {
        rel: 'stylesheet',
        href: '/css/zoom.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/aos@2.3.1/dist/aos.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
      },
      {
        // https://github.com/sha256/Pristine
        src: '/js/pristine.js',
      },
      {
        // https://owlcarousel2.github.io/OwlCarousel2/index.html
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
      },
      {
        // https://gasparesganga.com/labs/jquery-loading-overlay/
        src:
          'https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js',
      },
      {
        src: '/js/zoom.js',
      },
      {
        // https://quilljs.com/docs/quickstart/
        src: 'https://cdn.quilljs.com/1.3.6/quill.js',
      },
      {
        // https://michalsnik.github.io/aos/
        src: 'https://unpkg.com/aos@2.3.1/dist/aos.js',
      },
      { src: 'https://www.google.com/recaptcha/api.js' },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // https://www.npmjs.com/package/vue-js-toggle-button
    { src: '~plugins/vue-toogle-btn.js', mode: 'client' },
    // https://www.npmjs.com/package/@fortawesome/vue-fontawesome
    { src: '~/plugins/fontawesome.js' },
    // https://www.npmjs.com/package/vue-loading-skeleton
    { src: '~/plugins/vue-skeleton.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
        language: 'v2', // Recaptcha language (v2)
        siteKey: '6LeGpckaAAAAADkPdj1mssPNp1lU4JuSl3IY-eTn', // Site key for requests
        version: 2, // Version
        size: 'normal', // Size: 'compact', 'normal', 'invisible' (v2)
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
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
  target: 'static',

  // Default loading is false
  loading: false,

  // Public env variable
  publicRuntimeConfig: {
    recaptcha: {
      dev: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
      prod: '6LeGpckaAAAAADkPdj1mssPNp1lU4JuSl3IY-eTn',
    },
    baseurl: {
      dev: 'http://127.0.0.1:3333/api/v1',
      prod: 'https://apiforkohat.balikpapanpedia.com/api/v1',
    },
  },
}
