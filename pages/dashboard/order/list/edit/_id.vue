<template>
  <div>
    <div class="container">
      <div>
        <b-button type="button" variant="primary" @click="redirectBack()">
          <font-awesome-icon icon="arrow-left" />
          <span>Kembali</span>
        </b-button>
      </div>
      <h3 class="mt-2">Ubah Isi Tatanan</h3>
      <div>
        <FormsEditEmployeeOrder />
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
