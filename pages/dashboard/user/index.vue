<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar Pengguna</h3>
      <div>
        <b-button type="button" variant="primary" @click="redirectUser()">
          <span>Buat Pengguna</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
      <div>
        <TablesUser />
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
    redirectUser() {
      this.$router.push('/dashboard/user/create')
    },
  },
}
</script>
