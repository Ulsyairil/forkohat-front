<template>
  <footer class="footer bg-light text-primary">
    <div class="container">
      <span>&copy; {{ year }} FORKOHAT BALIKPAPAN</span>
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
  background-color: #f5f5f5;
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
