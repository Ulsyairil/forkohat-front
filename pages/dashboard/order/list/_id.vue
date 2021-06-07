<template>
  <div>
    <div class="container">
      <h3 class="mb-3">List Isi Tatanan</h3>
      <div>
        <b-button type="button" variant="primary" @click="redirectBack()">
          <font-awesome-icon icon="arrow-left" />
          <span>Kembali</span>
        </b-button>
        <b-button
          type="button"
          variant="primary"
          @click="redirectCreateOrderStuff()"
        >
          <span>Buat Isi Tatanan</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
      <div>
        <Cards-Order />
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
    redirectCreateOrderStuff() {
      this.$router.push(
        `/dashboard/order/list/add?order_id=${this.$route.params.id}`
      )
    },
  },
}
</script>
