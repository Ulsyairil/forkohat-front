<template>
  <div class="nk-footer bg-white">
    <div class="container-fluid">
      <div class="nk-footer-wrap">
        <div class="nk-footer-copyright">
          {{ this.year }} &copy;
          <a href="javascript:void(0)"> FORKOHAT BALIKPAPAN </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'

export default {
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.getYearNow()
  },
  methods: {
    getYearNow() {
      return (this.year = Moment().format('YYYY'))
    },
  },
}
</script>