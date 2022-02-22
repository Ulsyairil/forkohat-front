<template>
  <div class="nk-footer bg-white">
    <div class="container-fluid">
      <div class="nk-footer-wrap">
        <div class="nk-footer-copyright">
          {{ this.year }} &copy;
          <NuxtLink to="/dashboard"> FORKOHAT BALIKPAPAN </NuxtLink>
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