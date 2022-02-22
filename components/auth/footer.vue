<template>
  <div class="nk-footer nk-auth-footer-full">
    <div class="container wide-lg">
      <div class="row g-3">
        <div class="col-lg-6">
          <div class="nk-block-content text-center text-lg-left">
            <p class="text-soft">
              {{ this.year }} &copy;
              <a href="javascript:void(0)"> FORKOHAT BALIKPAPAN </a>
            </p>
          </div>
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