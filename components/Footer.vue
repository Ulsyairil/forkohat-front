<template>
  <footer class="footer text-primary">
    <div class="container">
      <span class="font-weight-bold"
        >&copy; {{ year }} FORKOHAT BALIKPAPAN</span
      >
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: transparent;
}
</style>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.getYear
  },
  computed: {
    getYear() {
      return (this.year = moment().year())
    },
  },
}
</script>
