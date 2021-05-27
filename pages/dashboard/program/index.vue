<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar Program</h3>
      <div>
        <b-button type="button" variant="primary" @click="redirectProgram()">
          <span>Buat Program</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
        <b-button type="button" variant="primary" @click="redirectOrder()">
          <span>Buat Isi Tatanan</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
      <div>
        <TablesProgram />
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
    redirectProgram() {
      this.$router.push('/dashboard/program/create')
    },
    redirectOrder() {
      this.$router.push('/dashboard/program/order/create')
    },
  },
}
</script>
