<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar FAQ</h3>
      <div>
        <a href="javascript:void(0)" @click="redirect()">
          <span>Buat FAQ</span>
          <font-awesome-icon icon="arrow-right" />
        </a>
      </div>
      <div>
        <TablesFaq />
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
      this.$router.push('/dashboard/faq/create')
    },
  },
}
</script>
