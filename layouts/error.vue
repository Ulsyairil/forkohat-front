<template>
  <!-- app-root -->
  <div class="nk-app-root">
    <div class="nk-main">
      <div class="nk-wrap nk-wrap-nosidebar">
        <!-- content -->
        <div class="nk-content">
          <div class="nk-block nk-block-middle wide-xs mx-auto">
            <div class="nk-block-content nk-error-ld text-center">
              <h1 class="nk-error-head">
                {{ error.statusCode }}
              </h1>
              <h3 class="nk-error-title" v-if="error.statusCode === 404">
                Halaman Tidak Ditemukan
              </h3>
              <h3 class="nk-error-title" v-if="error.statusCode === 504">
                Kesalahan Gateway Timeout
              </h3>
              <p class="nk-error-text" v-if="error.statusCode === 404">
                Kami mohon maaf atas ketidaknyamanan ini. Sepertinya Anda
                mencoba mengakses halaman yang telah dihapus atau tidak pernah
                ada.
              </p>
              <p class="nk-error-text" v-if="error.statusCode === 504">
                Kami mohon maaf atas ketidaknyamanan ini. Sepertinya server kami
                tidak menerima respons tepat waktu.
              </p>
              <a
                href="javascript:void(0)"
                class="btn btn-lg btn-primary mt-2"
                @click="previousPage()"
              >
                Kembali
              </a>
            </div>
          </div>
        </div>
        <!-- end content -->
      </div>
    </div>
  </div>
  <!-- end app-root -->
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
  head: {
    bodyAttrs: {
      class: 'nk-body bg-white npc-general pg-error',
    },
  },
  methods: {
    previousPage() {
      return this.$router.go(-1)
    },
  },
}
</script>