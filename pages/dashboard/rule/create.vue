<template>
  <div>
    <div class="container">
      <b-button type="button" variant="primary" @click="redirectBack()">
        <font-awesome-icon icon="arrow-left" />
        <span>Kembali</span>
      </b-button>
      <div class="title mt-3">
        <h3>Buat Pengguna</h3>
      </div>
    </div>
    <div class="container">
      <FormsCreateUser />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    redirectBack() {
      this.$router.back()
    },
  },
}
</script>
