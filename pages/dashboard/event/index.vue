<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar Event</h3>
      <div>
        <b-button type="button" variant="primary" @click="redirect()">
          <span>Buat Event</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
      <div>
        <TablesEvent />
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
      this.$router.push('/dashboard/event/create')
    },
  },
}
</script>
