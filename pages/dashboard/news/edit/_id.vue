<template>
  <div>
    <div class="container">
      <a href="javascript:void(0)" @click="redirectBack()">
        <font-awesome-icon icon="arrow-left" />
        <span>Kembali</span>
      </a>
      <div class="title mt-3">
        <h3>Ubah Berita</h3>
      </div>
    </div>
    <div class="container">
      <FormsEditNews />
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
