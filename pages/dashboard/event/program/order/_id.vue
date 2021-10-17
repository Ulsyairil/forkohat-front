<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar Kegiatan</h3>
      <div>
        <b-button type="button" variant="primary" @click="redirectBack()">
          <font-awesome-icon icon="arrow-left" />
          <span>Kembali</span>
        </b-button>
        <b-button type="button" variant="primary" @click="redirect()">
          <span>Buat Kegiatan</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
      <div>
        <Tables-Event />
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
    redirect() {
      this.$router.push(
        `/dashboard/event/program/order/create/${this.$route.params.id}`
      )
    },
    redirectBack() {
      this.$router.back()
    },
  },
}
</script>
