<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Tatanan</h3>
      <div>
        <b-button type="button" variant="primary" @click="redirectBack()">
          <font-awesome-icon icon="arrow-left" />
          <span>Kembali</span>
        </b-button>
      </div>
      <div>
        <Tables-Event-Order />
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
