import Vue, { inject } from 'vue'
import Vuelidate from 'vuelidate'
import VueCaptchaCode from '@johnnyguan/vue-captcha-code'
import VueEasyLightbox from 'vue-easy-lightbox'
import CKEditor from 'ckeditor4-vue'
import * as d3Chart from 'd3-org-chart'
import * as d3 from 'd3'

Vue.use(Vuelidate)
Vue.use(VueCaptchaCode)
Vue.use(VueEasyLightbox)
Vue.use(CKEditor)

export default (ctx, inject) => {
  inject('d3', d3)
  inject('d3org', d3Chart)
}
