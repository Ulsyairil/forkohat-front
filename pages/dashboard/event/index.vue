<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar Event</h3>
      <div>
        <a href="javascript:void(0)" @click="redirect()">
          <span>Buat Event</span>
          <font-awesome-icon icon="arrow-right" />
        </a>
      </div>
      <div>
        <TablesEventTable />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    redirect() {
      this.$router.push('/dashboard/event/create')
    },
  },
}
</script>
