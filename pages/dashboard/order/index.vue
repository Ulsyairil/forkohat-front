<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar Tatanan</h3>
      <div>
        <TablesOrder />
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
}
</script>
