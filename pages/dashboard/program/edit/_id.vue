<template>
  <div>
    <div class="container">
      <div>
        <b-button type="button" variant="primary" @click="redirectBack()">
          <font-awesome-icon icon="arrow-left" />
          <span>Kembali</span>
        </b-button>
        <b-button type="button" variant="primary" @click="redirectOrder()">
          <span>Buat Isi Tatanan</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
      <div class="title mt-3">
        <h3>Ubah Program</h3>
      </div>
    </div>
    <div class="container">
      <FormsEditProgram />
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
    redirectOrder() {
      this.$router.push('/dashboard/program/order/create')
    },
  },
}
</script>
