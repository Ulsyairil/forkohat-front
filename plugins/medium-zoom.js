import Vue from 'vue'
import mediumZoom from 'medium-zoom'

const initZoom = () => {
  mediumZoom('img.zoom:not(.medium-zoom-image)')
}

Vue.mixin({
  mounted() {
    initZoom()
  },
  updated() {
    initZoom()
  },
})
