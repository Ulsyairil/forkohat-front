<template>
  <div>
    <div class="container">
      <div>
        <b-button type="button" variant="primary" @click="redirectBack()">
          <font-awesome-icon icon="arrow-left" />
          <span>Kembali</span>
        </b-button>
      </div>
      <div class="title mt-2">
        <h3>Buat Kegiatan</h3>
      </div>
    </div>
    <div class="container">
      <FormsCreateEvent />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  methods: {
    redirectBack() {
      this.$router.back()
    },
  },
}
</script>
