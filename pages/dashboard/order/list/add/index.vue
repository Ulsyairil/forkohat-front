<template>
  <div>
    <div class="container">
      <div class="mb-3">
        <b-button type="button" variant="primary" @click="redirectBack()">
          <font-awesome-icon icon="arrow-left" />
          <span>Kembali</span>
        </b-button>
      </div>
      <h3>Buat Isi Tatanan</h3>
      <div class="mt-3">
        <Forms-Create-Employee-Order />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
    }
  },
  methods: {
    redirectBack() {
      this.$router.back()
    },
  },
}
</script>
