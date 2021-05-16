<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="my-5 text-center">
          <div v-if="error.statusCode === 404">
            <span class="text-error">404</span>
            <h4>Halaman Tidak Ditemukan</h4>
          </div>
          <div v-else>
            <span class="text-error">500</span>
            <h4>Terjadi Kesalahan Pada Server</h4>
          </div>
          <b-button @click="redirectBack()" variant="secondary" class="mt-4">
            <font-awesome-icon icon="arrow-left" />
            <span>Kembali</span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #50bbe6;
}

.text-error {
  font-size: 100pt;
}
</style>

<script>
export default {
  props: ['error'],
  layout: 'error',
  methods: {
    redirectBack() {
      this.$router.back()
    },
  },
}
</script>
